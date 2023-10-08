import { Model, Types, Schema, Document, model } from 'mongoose';

const { ObjectId } = Schema.Types;

export interface Account extends Document {
  userId: Types.ObjectId;
  amount: number;
}

interface IAccountModel extends Model<Account> {
  deposit: (userId: string, amount: number) => Promise<Account | null>;
}

export const AccountSchema = new Schema<Account, IAccountModel>({
  userId: { type: ObjectId, required: true },
  amount: { type: Number, required: true },
});

AccountSchema.statics = {
  async deposit(userId: string, amount: number) {
    const filterQuery = { userId: userId };
    const updateQuery = { userId, $inc: { amount } };

    return this.findOneAndUpdate(filterQuery, updateQuery, {
      new: true,
      upsert: true,
    }).exec();
  },
};

const AccountModel = model<Account, IAccountModel>('account', AccountSchema);

export default AccountModel;
