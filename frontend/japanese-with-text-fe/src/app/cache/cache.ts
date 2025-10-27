import fs from 'fs/promises'
import path from 'path'


const CACHE_DIR = path.join(process.cwd(), '.next', 'cache')

export async function saveData(data: any): Promise<string> {
	const id = crypto.randomUUID()
	await fs.mkdir(CACHE_DIR, { recursive: true })
	await fs.writeFile(
		path.join(CACHE_DIR, `${id}.json`),
		JSON.stringify({ data: data, timestamp: Date.now() })
	)
	console.log("Saved to file: ", id)
	return id
}

export async function getData(id: string): Promise<any | null> {
	try {
		const filePath = path.join(CACHE_DIR, `${id}.json`)
		const content = await fs.readFile(filePath, 'utf-8')
		const parsed = JSON.parse(content)
		console.log("Retrieved from file: ", parsed)
		return parsed.data
	} catch (error) {
		console.log("File not found: ", id)
		return null
	}
}
