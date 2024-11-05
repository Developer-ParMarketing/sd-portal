import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

export default connectToDatabase;
