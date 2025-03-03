import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_STRING);

    console.log(`MongoDB DATABASE IS CONNECTED: ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
