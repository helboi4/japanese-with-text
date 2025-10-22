const BASE_URL = process.env.API_URL

async function get_lookup(text: string) {
	const url = `${BASE_URL}/lookup-text`
	const options = {
		method: "POST",
		body: text
	}
	try {
		const response = await fetch(url, options)
		if (!response.ok) {
			throw new Error(`Unable to lookup text: ${response.statusText}`)
		}

		const result = await response.json()
		return result
	} catch (error: any) {
		console.error(error.message)
	}
}

async function get_translation(text: string) {
	const url = `${BASE_URL}/lookup-text`
	const options = {
		method: "POST",
		body: text
	}


}
