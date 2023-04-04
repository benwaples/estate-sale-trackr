import { Request, Response } from "express";
import fetch from 'node-fetch';
import { parseResponseBodyIntoDom } from "../utils/utils";
import { Dictionary, ExpressRequest } from "../types";


export async function allUpcomingSalesIds() {
	const response = await fetch('https://www.estatesale-finder.com/all_sales_list.php?saletypeshow=1&regionsshow=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,31,32,33,34,23,24,25,26,27,28,29,35,36,37&proonly=false&todayonly=false');
	const document = await parseResponseBodyIntoDom(response)

	const allSaleLinks = document.querySelectorAll('a.view')

	const saleIdList: number[] = [];

	allSaleLinks.forEach(link => {
		const href = link.attributes.getNamedItem('href')
		const saleId = href?.textContent?.split('=')[1]

		if (saleId) saleIdList.push(Number(saleId))
	})

	return saleIdList;
}

export async function getSaleInfo(id: number) {
	const saleURL = `https://www.estatesale-finder.com/viewsale.php?saleid=${id}`;

	const response = await fetch(saleURL);
	const document = await parseResponseBodyIntoDom(response)

	const rows = document.querySelectorAll('.salelist .row')
	const data: Dictionary = {}

	rows.forEach(row => {
		if (row.childNodes.length < 2) return;

		const [, rawTitle, rawDescription] = row.childNodes;
		if (rawTitle.textContent && rawDescription.textContent) {
			data[rawTitle.textContent] = rawDescription.textContent
		}
	})

	return data
}

export async function allUpcomingSales(req: ExpressRequest, res: Response) {
	const saleIds = await allUpcomingSalesIds();

	const saleInfo = await Promise.all(saleIds.map(id => getSaleInfo(id)))

	res.send(saleInfo)
}