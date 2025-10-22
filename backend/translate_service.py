from custom_types import TranslateResponse
import logging
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, BitsAndBytesConfig

logging.basicConfig(format="%(asctime)s %(levelname)s %(message)s", level=logging.DEBUG)
log = logging.getLogger(__name__)

bnb_config = BitsAndBytesConfig(load_in_8bit=True)
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-1.3B", quantization_config=bnb_config)
tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-1.3B")

def translate_text(text: str) -> TranslateResponse | None:
    tokenizer.src_lang = "jpn_Jpan"
    inputs = tokenizer(text, return_tensors="pt")
    inputs = {k: v.to(model.device) for k, v in inputs.items()}
    translated_tokens = model.generate(
        **inputs, forced_bos_token_id=tokenizer.convert_tokens_to_ids("eng_Latn"), max_length=10000,
    )
    translation = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
    return TranslateResponse(translated_text=translation)

