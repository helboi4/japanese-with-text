class BaseApi {
	base_url: string

	constructor() {
		this.base_url = process.env.API_URL ? process.env.API_URL : "http://localhost:8000"
	}

	async post(url: string, options: Request, message: string) {
		try {
			const response = await fetch(url, options)
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
