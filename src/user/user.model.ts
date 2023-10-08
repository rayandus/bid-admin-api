import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface User extends mongoose.Document {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export const UserSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isLoggedIn: { type: Boolean, default: false },
  },
  {
    collection: 'users',
  },
);

UserSchema.pre('save', async function (next) {
  const user = this as User;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
