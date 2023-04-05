import { Response } from "node-fetch";
import jsdom from 'jsdom'

export async function parseResponseBodyIntoDom(response: Response): Promise<Document> {
	const body = await response.text();

	const dom = new jsdom.JSDOM(body)
	return dom.window.document
}

export async function removeTabsAndNewLines(x: string | undefined): string | null {
	if (!x) return null
	return x.replace("\\t", '').replace("\\n", '').trim()
}