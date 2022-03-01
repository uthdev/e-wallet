import LogInDto from 'dto/logIn.dto';
import { Request, Response, NextFunction, response } from 'express';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from '../services/authentication.service';


class AuthenticationController {
  // private user = userModel;

  // constructor() {
  //   // this.initializeRoutes();
  // }

  // private initializeRoutes() {
  //   this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
  //   this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
  //   this.router.post(`${this.path}/logout`, this.loggingOut);
  // }

  static async registration (request: Request, response: Response, next: NextFunction) {
    const userData: CreateUserDto = request.body;
    try {
      const {
        user,
      } = await AuthenticationService.register(userData);
      // response.setHeader('Set-Cookie', [cookie]);
      response.status(201).json({
        status: 201,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async loggingIn (request: Request, response: Response, next: NextFunction) {
    const logInData: LogInDto = request.body;
    try {
      const { user } = await AuthenticationService.login(logInData);
      console.log(user);
      
      response.cookie('access_token', user.token, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: true,
      });
      
      response.status(200).json({
        status: 200,
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

}

export default AuthenticationController;