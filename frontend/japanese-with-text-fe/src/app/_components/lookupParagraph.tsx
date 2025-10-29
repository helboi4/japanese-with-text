import { lookupText } from "../_api/text_process_service"
import DefinedWord from "../_types/definedWord";
import LookupResponse from "../_types/lookupResponse";
import Word from "./Word";

export default async function LookupParagraph({ chunk, lookupData }: { chunk: string, lookupData: LookupResponse }) {
	let data = lookupData;
	let definedWords: DefinedWord[] = [];
	if (data !== null) {
		console.log("data: ", data)
		definedWords = data.defined_words;
	} else {
		data = await lookupText(chunk);
		definedWords = data ? data.defined_words : [];
	}

	console.log("defined words: ", data.defined_words);

	const renderWords = () => {
		for (const word of definedWords) {
			console.log("word: ", word.original_word)
			return (
				<Word definedWord={word}></Word>
			)
		}
	}

	return (<div>
		{
			definedWords.map((word) => (
				<Word definedWord={word}></Word>
			))
		}
	</div>)
}
