import { lookupText } from "../api/text_process_service"

export default async function LookupResult({ chunk }: { chunk: string }) {
	setTimeout(() => { }, 100)
	const result = await lookupText(chunk)
	console.log("here")

	return (<div>
		<h2>New chunks</h2>
		<div>{JSON.stringify(result)}</div>
	</div>)
}
