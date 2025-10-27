import { Suspense } from "react";
import { getData } from "../cache/cache";
import Spinner from "../components/spinner"
import { lookupText } from "../api/text_process_service";
import LookupResult from "../components/lookupParagraph";

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
			<div>
				{firstLookup ? JSON.stringify(firstLookup) : "Fetch failed"}
			</div>
			{chunks.map((chunk: string, index: number) => (
				<Suspense key={index} fallback={<Spinner />}>
					<LookupResult chunk={chunk} />
				</Suspense>
			))}
		</section>
	)
}
