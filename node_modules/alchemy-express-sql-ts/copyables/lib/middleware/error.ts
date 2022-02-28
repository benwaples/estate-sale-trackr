// eslint-disable-next-line no-unused-vars
export {}

import { Request, Response, NextFunction } from 'express'

export interface IsError {
  status: number;
  message: string;
}

module.exports = (err: IsError, req: Request, res: Response, next: NextFunction) => {
  let status = err.status || 500;

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message
  });
};
