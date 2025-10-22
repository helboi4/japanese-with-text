const BASE_URL = process.env.API_URL

class TextProcessService extends BaseApi {

	constructor() {
		super()
	}

	async get_lookup(text: string) {
		const url = `${BASE_URL}/lookup-text`
		const request = new Request(
			url,
			{
				method: "POST",
				body: text
			}
		)
		return this.do_request(request, "Unable to lookup text")
	}

	async get_translation(text: string) {
		const url = `${BASE_URL}/translate-text`
		const request = new Request(
			url,
			{
				method: "POST",
				body: text
			}
		)
		return this.do_request(request, "Unable to translate text")
	}
}
