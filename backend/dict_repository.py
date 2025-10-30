from psycopg import OperationalError, DataError, IntegrityError, ProgrammingError, connect
from psycopg_pool import ConnectionPool
from os import environ
import logging
from psycopg.rows import DictRow, dict_row
from custom_types import Mode
from dotenv import load_dotenv

load_dotenv()

db_settings = f"""host={environ.get("DB_HOST")}
    port={environ.get("DB_PORT")}
    dbname={environ.get("DB_NAME")}
    user={environ.get("DB_USER")}
    connect_timeout={environ.get("DB_TIMEOUT")}"""

logging.basicConfig(format="%(asctime)s %(levelname)s %(message)s", level=logging.DEBUG)
log = logging.getLogger(__name__)
logging.getLogger("psycopg").setLevel(logging.ERROR)

dict_con_pool: ConnectionPool | None = None

def create_dict_connection_pool() -> bool:
    global dict_con_pool
    try:
        dict_con_pool = ConnectionPool(conninfo=db_settings, min_size=2, max_size=10, timeout=30)
        dict_con_pool.wait()
        log.debug("Dictionary db connection pool available")
        return True
    except OperationalError as e:
        log.error(f"Unable to create db pool for dictionary: {str(e)}")
        return False

def cleanup_dict_connection_pool() -> None:
    global dict_con_pool
    if(dict_con_pool == None):
        log.debug("Dictionary db pool does not exist, cannot be cleaned up")
        return
    try:
        dict_con_pool.close()
        dict_con_pool = None
        log.info("Dictionary db pool closed sucessfully")
    except OperationalError as e:
        log.debug(f"Dictionary db connection pool could not be closed: {str(e)}")

def get_dict_connection_pool() -> ConnectionPool | None:
    global dict_con_pool
    if(dict_con_pool == None):
        log.error("No connection pool available, aborting")
        return None
    return dict_con_pool

def get_dict_entries_for_text(morphemes: list[str]) -> list[list[DictRow]]:
    con_pool = get_dict_connection_pool()
    if (con_pool == None):
        return []
    if(len(morphemes) <= 0):
        return []
    try:
        with con_pool.connection() as con:
            try:
                results = []
                with con.cursor(row_factory=dict_row) as cur:
                    for m in morphemes:
                        mode = get_mode(m)
                        query: str = ""
                        if(mode == Mode.KANA):
                            query = """
                                SELECT * FROM entries WHERE word_kana @> ARRAY[%s] ORDER BY 
                                (COALESCE(array_length(word_kanji, 1), 0) > 0)::int, id;
                                """
                        else:
                            query = "SELECT * FROM entries WHERE word_kanji @> ARRAY[%s];"
                        cur.execute(query, (m,))
                        result = cur.fetchall()
                        results.append(result)
                    return results
            except (DataError, IntegrityError, ProgrammingError, TypeError) as e:
                log.debug(f"Entry selection failed: {str(e)}")
                return []
    except OperationalError as e:
        log.error(f"Unable to establish db connection for entry retrieval: {str(e)}")
        return []

def get_senses_by_entry_id(id: int) -> list[DictRow]:
    con_pool = dict_con_pool
    if(con_pool == None):
        return []
    try:
        with con_pool.connection() as con:
            try:
                with con.cursor(row_factory=dict_row) as cur:
                    query: str = "SELECT definitions, extra_info FROM senses WHERE entry_id = %s"
                    cur.execute(query,(id,))
                    return cur.fetchall()
            except (DataError, IntegrityError, ProgrammingError, TypeError) as e:
                log.debug(f"Sense selection failed for entry id {id}: {str(e)}")
                return []
    except OperationalError as e:
        log.error(f"Unable to establish db connection for sense retrieval: {str(e)}")
        return []
    
    #TODO: consider that actually i want to throw errors when unable to get entries or senses from the db because i need to know the difference between there just not being any entries vs there being an error


def get_mode(morpheme:str) -> Mode:
    for m in list(morpheme):
        if(0x4E00 <=ord(m) <= 0x9FAF):
            return Mode.KANJI
    return Mode.KANA
