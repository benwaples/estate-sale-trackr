import { Request, Response, NextFunction } from 'express'
import { IsError } from './error'

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const err: Partial<IsError> = new Error('Not Found');
  err.status = 404;
  next(err);
};
