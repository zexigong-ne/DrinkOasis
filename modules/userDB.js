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

  userDB.verifyUser = async (userName, userPsw) => {
    const { client, db } = await connectToMongoDB();
    const usersCollection = db.collection("User");

    const user = await usersCollection.findOne({ username: userName });

    try {
      if (!user) {
        console.log("User not found");
        return { success: false, message: "User not found" };
      }

      if (user.password !== userPsw) {
        console.log("Password incorrect");
        return { success: false, message: "Incorrect password" };
      }
      console.log("Password correct");

      return { success: true, user };
    } finally {
      console.log("DB closing connection");
      await client.close();
    }
  };

  return userDB;
}

export const userDB = UserDB();
