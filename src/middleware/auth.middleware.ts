// import redis from 'redis';
// import { UserEntity } from '../db/entity/User';
import { NextFunction, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { User } from '../models';

const authMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization
  const token = authHeader?.split(' ')[1];
  if (token) {
    const secret = <string>process.env.JWT_SECRET;
    try {
      const payload = <JwtPayload>jwt.verify(token, secret);
      const id = payload._id;
      const user = await User.findById(id)
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
