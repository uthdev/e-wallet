import HttpException from './HttpException';

class ResourceExistsException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export default ResourceExistsException;
