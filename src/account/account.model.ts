import { Model, Types, Schema, Document, model } from 'mongoose';

const { ObjectId } = Schema.Types;

export interface Account extends Document {
  userId: Types.ObjectId;
  currency: string;
  amount: number;
}

interface IAccountModel extends Model<Account> {
  deposit: ({
    userId,
    currency,
    amount,
  }: {
    userId: string;
    currency: string;
    amount: number;
  }) => Promise<Account | null>;
}

export const AccountSchema = new Schema<Account, IAccountModel>({
  userId: { type: ObjectId, required: true },
  currency: { type: String, require: true },
  amount: { type: Number, required: true },
});

AccountSchema.statics = {
  async deposit({ userId, currency, amount }: { userId: string; currency: string; amount: number }) {
    const filterQuery = { userId: userId };
    const updateQuery = { userId, currency, $inc: { amount } };

    return this.findOneAndUpdate(filterQuery, updateQuery, {
      new: true,
      upsert: true,
    }).exec();
  },
};

const AccountModel = model<Account, IAccountModel>('account', AccountSchema);

export default AccountModel;
