from enum import Enum
from pydantic import BaseModel
from psycopg.rows import DictRow

class TextRequest(BaseModel):
    text: str

class GrammarResponse(BaseModel):
    original_text: str
    translated_text: str
    explanation: str
    difficulty_level: str

class Sense(BaseModel):
    definitions: list[str]
    extra_info: str | None

class DictEntry(BaseModel): 
    word_kanji: list[str]
    word_kana: list[str]
    senses: list[Sense]


class DefinedWord(BaseModel):
    original_word: str
    dict_entries: list[DictEntry]

class LookupResponse(BaseModel):
    defined_words: list[DefinedWord]
    
class LookupObject(BaseModel):
    kanji_rows: list[DictRow]
    kana_rows: list[DictRow]
    
class Mode(Enum):
    KANJI = "kanji"
    KANA = "kana"

