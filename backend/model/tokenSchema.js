import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "15m",
  },
});

const Token = model("Token", tokenSchema);
export default Token;
