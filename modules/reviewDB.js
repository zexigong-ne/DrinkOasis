import "dotenv/config";
import { MongoClient } from "mongodb";

function ReviewDB() {
  const uri = process.env.MONGO_URL;
  const reviewDB = {};

  const connectToMongoDB = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("DrinkOasis");

    return { client, db };
  };

  reviewDB.insertReview = async (review) => {
    const { client, db } = await connectToMongoDB();
    const reviewsCollection = db.collection("Bars");

    try {
      const result = await reviewsCollection.insertOne(review);
      return result;
    } finally {
      console.log("DB closing connection");
      await client.close();
    }
  };

  reviewDB.getAllReviews = async () => {
    const { client, db } = await connectToMongoDB();
    const reviewsCollection = db.collection("Bars");
    try {
        const reviews = await reviewsCollection.aggregate([
            {
                $lookup:
                {
                    from: "User",
                    localField: "id",
                    foreignField: "id",
                    as: "authorDetails"
                }
            },
            {
                $unwind: "$authorDetails"
            },
            {
                $project: {
                    barName: 1,
                    location: 1,
                    address: 1,
                    review: 1,
                    authorName: "$authorDetails.username"
                }
            }
        ]).toArray();
        return reviews;
    } finally {
        console.log("DB closing connection");
        await client.close();
    }
};



  return reviewDB;
}

export const reviewDB = ReviewDB();
