class BaseApi {
	base_url: string

	constructor() {
		this.base_url = process.env.API_URL ? process.env.API_URL : "http://localhost:8000"
	}

	async do_request(url: string, options: Request | null, message: string) {
		try {
			let response;
			if (options !== null) {
				response = await fetch(url, options)
			} else {
				response = await fetch(url)
			}
			if (!response.ok) {
				throw new Error(`${message}: ${response.statusText}`)
			}

			const result = await response.json()
			return result
		} catch (error: any) {
			console.error(error.message)
		}
	}
}
