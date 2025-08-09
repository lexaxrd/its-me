import mongoose, { Model, Schema } from "mongoose";

export interface IProfile extends Document {
  name: string;
  url: number;
  // istediğin diğer alanlar
}

const ProfileSchema: Schema<IProfile> = new Schema({
  name: { type: String },
  url: { type: Number },
});


export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);