import hashPassword from '../helpers/hashPassword';
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true}
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", function(next) {
    this.password = hashPassword(this.password);
    next()
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);