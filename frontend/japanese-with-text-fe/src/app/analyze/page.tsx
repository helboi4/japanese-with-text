import { Suspense } from "react";
import { getData } from "../cache/cache";
import Spinner from "../components/spinner"
import { lookupText } from "../api/text_process_service";
import LookupParagraph from "../components/lookupParagraph";

export default async function AnalysisPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const params = await searchParams
	const id = Array.isArray(params.analysis) ? params.analysis[0] : params.analysis
	const resultsData = await getData(id)
	console.log("got data: ", resultsData)
	let firstLookup;
	let chunks;
	if (resultsData !== null) {
		firstLookup = resultsData.firstLookup
		chunks = resultsData.chunks
	}

	return (
		<section className=".main-content">
			<LookupParagraph chunk={chunks[0]} lookupData={firstLookup} />
			{chunks.slice(1).map((chunk: string, index: number) => (
				<Suspense key={index} fallback={<Spinner />}>
					<LookupParagraph chunk={chunk} lookupData={null} />
				</Suspense>
			))}
		</section>
	)
}
