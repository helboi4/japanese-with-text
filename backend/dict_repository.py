import psycopg
import os
import logging
from psycopg.rows import DictRow, dict_row
from custom_types import Mode


db_settings = {
    "host": os.getenv("DB_HOST"),
    "port" : os.getenv("DB_PORT"),
    "dbname" : os.getenv("DB_NAME"),
    "user" : os.getenv("DB_USER"),
    "connect_timeout" : os.getenv("DB_TIMEOUT")
}

logging.basicConfig(level=logging.DEBUG, format="%(ascitime)s %(levelname)s %(messages)s")
logging.getLogger("psycopg").setLevel(logging.DEBUG)
log = logging.getLogger(__name__)
logging.getLogger("psycopg").setLevel(logging.ERROR)

#TODO: Create a method that creates a connection and assigns it to a global parameter in this file to be used by all methods. The connection method can then be called by each route, creating a db session for the whole route whenever needed instead of one for each method here.


def get_dict_entries_for_text(morphemes: list[str]) -> list[list[DictRow]]:
    if(len(morphemes) <= 0):
        return []
    try:
        with psycopg.connect(**db_settings) as con:
            try:
                results = []
                with con.cursor(row_factory=dict_row) as cur:
                    for m in morphemes:
                        mode = get_mode(m)
                        query: str = f"SELECT * FROM entries WHERE word_{mode.value} @> array[%s];"
                        cur.execute(query)
                        results.append(cur.fetchall())
                    return results
            except (psycopg.DataError, psycopg.IntegrityError, psycopg.ProgrammingError, TypeError) as e:
                log.debug(f"Entry selectionfailed: {str(e)}")
                return []
    except psycopg.OperationalError as e:
        log.error(f"Unable to establish db connection: {str(e)}")
        return []

def get_senses_by_entry_id(id: int):
     

def get_mode(morpheme:str) -> Mode:
    if(0x4E00 <=ord(morpheme[0]) >= 0x9FAF or 0x4E00 <=ord(morpheme[1]) >= 0x9FAF):
        return Mode.KANJI
    return Mode.KANA
