import mongoose, { Schema, Document, Model } from "mongoose";

export type User = {
  username: string,
  _id: string,
  email: string,
  password: string,
}
export type ProfileComponent = {
  socialMedias?: {

    enabled: boolean
    id: string;
    type: string;
    backgroundColor: string;
    innerColor: string;
    borderStyle: string;
    createdAt: string;
    username: string;

  }[];
  [key: string]: any;
};
export type Profile = {
  _id: string;
  profileName: string;
  profileUrl: string;
  createdAt: string;
  views: number;
  linkClicks: number;
  selectedStockBackground: string;
  backgroundImg: string;
  displayName: {
    text: string;
    backgroundColor: string;
    innerColor: string;
    fontType: string;
    fontSize: number;
    borderStyle: string;
  },
  profilePhoto: {
    photo: string;
    photoSize: string;
    borderStyle: string;
  },
  components: ProfileComponent[]
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profiles: any[];
}


const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profiles: { type: [Object], default: [] },
});

export const userSchema: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
