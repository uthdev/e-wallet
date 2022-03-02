import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IFunding extends Document {
  customerId: IUser['_id'];
  amount: number;
  reference: string;
}


const FundingSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    amount: { type: Number, required: true },
    reference: {type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IFunding>("funding", FundingSchema);
