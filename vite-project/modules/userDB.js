import "dotenv/config";

import { MongoClient } from "mongodb";
// import { ObjectId } from "mongodb";

function UserDB() {
  const uri = process.env.MONGO_URL;
  const userDB = {};

  const connectToMongoDB = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("DrinkCrafter");

    return { client, db };
  };

  return userDB;
}

export const userDB = UserDB();
