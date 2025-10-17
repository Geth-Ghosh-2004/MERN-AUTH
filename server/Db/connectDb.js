import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // connect করা হলো
    console.log(`MongoDB Connected: ${conn.connection.host}`); // conn ঠিক আছে এখন
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
