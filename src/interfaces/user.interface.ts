import { IUser } from "models/user.model";

interface User {
  _id: string;
  firstName?: IUser["firstName"];
  lastName?: IUser["lastName"];
  email?: IUser["email"];
  password?: IUser["password"];
  createdAt?: Date;
}

export default User;