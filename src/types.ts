import { Request } from 'express'
export interface Dictionary {
	[key: string | number]: any
}

export type ExpressRequest<B = any, P = any> = Request<any, any, B, P>