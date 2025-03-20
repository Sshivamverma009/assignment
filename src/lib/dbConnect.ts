import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("DATABASE ALREADY CONNECTED!");
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.DATABASE_URI}/Todo_App` || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected succussfully");
  } catch (error) {
    console.log("SOME ERROR OCCURED: ", error);
    process.exit(1);
  }
}

export default dbConnect;