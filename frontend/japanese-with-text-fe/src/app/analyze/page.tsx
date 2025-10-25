import { getResults } from "../cache/cache";

export default async function AnalysisPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const params = await searchParams
	const id = Array.isArray(params.analysis) ? params.analysis[0] : params.analysis
	const resultsJson = id ? getResults(id) : ""


	return (
		<div>{JSON.stringify(resultsJson)}</div>
	)
}
