import dict_repository
from psycopg.rows import DictRow
from pydantic import BaseModel
from custom_types import Sense, DictEntry, TranslatedWord, TranslateResponse

def get_translate_response(morphemes: list[str]):
    dict_rows_list: list[list[DictRow]] = dict_repository.get_dict_results(morphemes)
    for row_list in dict_rows_list:
        for row in row_list:

            
    
