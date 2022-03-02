import mongoose, { Schema, Document } from 'mongoose';


export enum TransactionType {
  TRANSFER = 'transfer',
  FUNDING = 'funding',
  DEBIT = 'debit',
}
export interface ITransaction extends Document {
  sender: number;
  recipient: number;
  type: TransactionType;
  amount: number;
  narration: string
}


const TransactionSchema: Schema = new Schema(
  {
    sender: { type: Number, required: true},
    amount: { type: Number, required: true },
    recipient: { type: Number, required: true},
    type: { 
      type: String,
      enum: [
        TransactionType.DEBIT, 
        TransactionType.FUNDING, 
        TransactionType.TRANSFER
      ], 
      required: true,
    },
    narration: {type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("transaction", TransactionSchema);