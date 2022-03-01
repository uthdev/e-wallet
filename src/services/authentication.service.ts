import CreateUserDto from "dto/user.dto";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import User, { IUser } from '../models/user.model'
// import User from '../interfaces/user.interface';
import LogInDto from "dto/logIn.dto";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
// import userModel from './../user/user.model';

class AuthenticationService {
  
  // public user = User

  static async register(userData: CreateUserDto) {
    // const userRepository = getRepository(UserEntity);
    if (
      await User.findOne({ email: userData.email })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser  = new User(userData)
    const user = await newUser.save();
    console.log(user);
    
    // return response.status(201).json(omit(user, ["password"]))
    return {
      user,
    };
  }

  static async login(logInData: LogInDto) {
    const user = await User.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password,
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        // const cookie = this.createCookie(tokenData);
        return {
          user: {user, token: tokenData.token}
        };
      } else {
        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  }
  
  static createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = <string>process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    console.log(dataStoredInToken);
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
