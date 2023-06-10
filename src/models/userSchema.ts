import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  login: String,
  password: String,
});

export default model("UserCollection", userSchema);
