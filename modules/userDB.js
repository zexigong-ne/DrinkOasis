import "dotenv/config";

import { MongoClient } from "mongodb";
// import { ObjectId } from "mongodb";

function UserDB() {
  const uri = process.env.MONGO_URL;
  const userDB = {};

  const connectToMongoDB = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("DrinkOasis");

    return { client, db };
  };

  userDB.insertUser = async (user) => {
    const { client, db } = await connectToMongoDB();
    const usersCollection = db.collection("user");

    try {
      const result = await usersCollection.insertOne(user);
      return result;
    } finally {
      console.log("DB closing connection");
      await client.close();
    }
  };

  return userDB;
}

export const userDB = UserDB();
