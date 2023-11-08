import "dotenv/config";

import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

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
    const usersCollection = db.collection("User");

    try {
      const result = await usersCollection.insertOne(user);
      console.log("User inserted", result.insertedCount);
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

  userDB.getDiaries = async (username) => {
    const { client, db } = await connectToMongoDB();
    const usersCollection = db.collection("User");

    try {
      const userSelect = await usersCollection.findOne({ username: username });
      if (!userSelect) {
        return { status: 404, message: "User not found" };
      }
      const diariesCollection = userSelect.diaries;
      if (!Array.isArray(diariesCollection)) {
        return { status: 400, message: "Diaries collection is not an array" };
      }

      console.log("diariesCollection is a array!");

      return { status: 200, diariesCollection };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Internal Server Error" };
    } finally {
      client.close();
    }
  };

  userDB.deleteDiary = async (username, diaryId) => {
    const { client, db } = await connectToMongoDB();
    const usersCollection = db.collection("User");

    try {
      const userSelect = await usersCollection.findOne({ username: username });
      if (!userSelect) {
        return { status: 404, message: "User not found" };
      }

      const diariesCollection = userSelect.diaries;
      if (!Array.isArray(diariesCollection)) {
        return { status: 400, message: "Diaries collection is not an array" };
      }

      const diaryIndex = diariesCollection.findIndex(
        (diary) => diary.id === parseInt(diaryId)
      );

      if (diaryIndex === -1) {
        return { status: 404, message: "Diary not found" };
      }

      diariesCollection.splice(diaryIndex, 1);

      const updateResult = await usersCollection.updateOne(
        { username: username },
        { $set: { diaries: diariesCollection } }
      );

      if (updateResult.modifiedCount === 1) {
        console.log("delete!!!!!");
        return { status: 200, message: "Diary deleted successfully" };
      } else {
        return { status: 500, message: "Internal Server Error" };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Internal Server Error" };
    } finally {
      client.close();
    }
  };

  return userDB;
}

export const userDB = UserDB();
