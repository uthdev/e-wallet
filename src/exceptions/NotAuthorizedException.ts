import HttpException from './HttpException';

class NotAuthorizedException extends HttpException {
  constructor(message: string) {
    super(403, message);
  }
}

export default NotAuthorizedException;
