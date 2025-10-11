import dict_repository
from psycopg.rows import DictRow
from pydantic import BaseModel
from custom_types import Sense, DictEntry, DefinedWord, LookupResponse

def initialise_pool() -> None:
    dict_repository.create_dict_connection_pool()

def close_pool() -> None:
    dict_repository.cleanup_dict_connection_pool()

def get_lookup_response(morphemes: list[str]):
    dict_rows_list: list[list[DictRow]] = dict_repository.get_dict_entries_for_text(morphemes)
    if(len(dict_rows_list) <=0):
        return LookupResponse(defined_words=[])
    translated_words: list[DefinedWord] = []
    for row_list, m in zip(dict_rows_list, morphemes):
        if(len(row_list) <= 0):
            translated_words.append(
                DefinedWord(
                    original_word=m,
                    dict_entries=[]
                )
            )
            continue
        dict_entries: list[DictEntry] = []
        for row in row_list:
            senses: list[DictRow] = dict_repository.get_senses_by_entry_id(row.get("id"))
            sense_list: list[Sense] = []
            for s in senses:
                sense = Sense(
                    definitions=s.get("definitions"),
                    extra_info=s.get("extra_info")
                )
                sense_list.append(sense)
            de = DictEntry(
                word_kanji=row.get("word_kanji"),
                word_kana=row.get("word_kana"),
                senses=sense_list
            )
            dict_entries.append(de)
        tw = DefinedWord(
            original_word=m,
            dict_entries=dict_entries
        )
        translated_words.append(tw)
    return LookupResponse(
        defined_words=translated_words
    )
