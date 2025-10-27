'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import BaseApi from "./base_api";
import { saveResults } from "../cache/cache";

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
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ text: text })
			}
		)
		return this.do_request(request, "Unable to lookup text")
	}

	async get_translation(text: string[]) {
		const url = `${BASE_URL}/translate-text`
		const request = new Request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ text_chunks: text })
			}
		)
		return this.do_request(request, "Unable to translate text")
	}
}

const service = new TextProcessService()

export async function analyzeText(formData: FormData) {
	const text = formData.get("text") as string

	let chunks = text.split("\n\n").filter(p => p.trim());

	if (chunks.length === 1) {
		chunks = text.split("\r\n\r\n").filter(p => p.trim());
		if (chunks.length === 1) {
			const words = text.split("。")
			const chunkSize = 5;
			chunks = []
			for (let i = 0; i < words.length; i += chunkSize) {
				chunks.push(words.slice(i, i + chunkSize).join(' '))
			}
		}
	}

	const translationPromise = service.get_translation(chunks)
	const lookupPromises = chunks.map(p => service.get_lookup(p));

	const [translations, lookups] = await Promise.all([
		translationPromise,
		Promise.all(lookupPromises)
	])


	const translation = translations.translated_text.join("\n\n");

	const resultsData = JSON.stringify({ translations, lookups })

	const id = saveResults(resultsData)

	redirect(`/analyze?analysis=${id}`)
}
