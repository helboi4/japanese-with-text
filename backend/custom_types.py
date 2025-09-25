from enum import Enum
from pydantic import BaseModel
from psycopg.rows import DictRow

class TextRequest(BaseModel):
    text: str
    target_language: str = "Japanese"
    user_level: str = "beginner"

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


class TranslatedWord(BaseModel):
    original_word: str
    dict_entries: list[DictEntry]

class TranslateResponse(BaseModel):
    translated_words: list[TranslatedWord]
    
class LookupObject(BaseModel):
    kanji_rows: list[DictRow]
    kana_rows: list[DictRow]
    
class Mode(Enum):
    KANJI = "kanji"
    KANA = "kana"

