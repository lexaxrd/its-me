import mongoose, { Schema, Document, Model } from "mongoose";


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profiles: mongoose.Types.ObjectId[]; 
}


const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profiles:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
});

export const userSchema: Model<IUser> =
    mongoose.models.userSchema || mongoose.model<IUser>("User", UserSchema);