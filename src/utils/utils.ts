import { Response } from "node-fetch";
import jsdom from 'jsdom'

export async function parseResponseBodyIntoDom(response: Response): Promise<Document> {
	const body = await response.text();

	const dom = new jsdom.JSDOM(body)
	return dom.window.document
}