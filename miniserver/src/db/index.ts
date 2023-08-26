import { Types, Schema, model, connect, Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const makeConnection = async () => {
  await connect(process.env.MONGO_URL || "", {});
};

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: String, // not required at creation in real applications usually (verify email first)
  roles: { type: Schema.Types.ObjectId, ref: "Role" },
});

export type UserType = Document & {
  email: string;
  hash: string; // salt will be in hash
  roles: Types.ObjectId[]; // string array really
};

export const RoleSchema = new Schema({
  name: String,
  level: Number,
});

export type RoleType = Document & {
  name: string;
  level: number;
};

export const UserModel = model<UserType>("User", UserSchema); // makes a collection called users (plural, lowercase)
export const RoleModel = model<RoleType>("Role", RoleSchema, "Role"); // makes a collection called Role (singular, uppercase because we tell it what to call it)
// The Role on line 6, is related to the model name -- the first argument here

makeConnection().then().catch(console.error);
