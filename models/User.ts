import mongoose from "mongoose";

export interface UserType {
  _id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<UserType>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<UserType>("User", UserSchema);
