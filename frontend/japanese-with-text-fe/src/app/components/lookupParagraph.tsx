import { lookupText } from "../api/text_process_service"

export default async function LookupParagraph({ chunk, lookupData }: { chunk: string, lookupData: object }) {
	let data = lookupData;
	if (data === null) {
		data = await lookupText(chunk)
	}

	return (<div>
		<h2>New chunks</h2>
		<div>{JSON.stringify(lookupData)}</div>
	</div>)
}
