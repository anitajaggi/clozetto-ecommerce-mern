import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = `${process.env.MONGODB_NAME}clozetto-ecomm`;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
