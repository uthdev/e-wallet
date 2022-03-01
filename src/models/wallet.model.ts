import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IWallet extends Document {
  balance: number;
  customerId: IUser['_id'];
  accountNumber: number;
}


const walletSchema: Schema = new Schema(
  {
    balance: { type: Number, default: 0.0 },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    accountNumber: {type: Number, required: true, unique: true}
  },
  { timestamps: true }
);

export default mongoose.model<IWallet>("wallet", walletSchema);
