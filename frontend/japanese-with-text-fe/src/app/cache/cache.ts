const resultsCache = new Map<string, any>()

export function saveResults(results: any): string {
	const id = crypto.randomUUID()
	resultsCache.set(id, { results, timestamp: Date.now() })
	return id
}

export function getResults(id: string): any | null {
	return resultsCache.get(id)?.results || null
}
