import { Request as ExpressRequest } from 'express';
import { JwtToken } from './jwt-token';

export interface ExtendedRequest extends ExpressRequest {
  user: JwtToken;
}
