import "dotenv/config";
import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';

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
                    id: 1,
                    authorName: "$authorDetails.username",
                }
            }
        ]).toArray();
        return reviews;
    } finally {
        console.log("DB closing connection");
        await client.close();
    }
  };

  reviewDB.getReviewById = async (reviewId) => {
    const { client, db } = await connectToMongoDB();
    const reviewsCollection = db.collection("Bars");
    try {
      const review = await reviewsCollection.findOne({ "_id": new ObjectId(reviewId) });
      return review;
    } finally {
      console.log("DB closing connection");
      await client.close();
    }
  };
  
  reviewDB.updateReview = async (reviewId, updateFields) => {
    const { client, db } = await connectToMongoDB();
    const reviewsCollection = db.collection("Bars");
    try {
      const result = await reviewsCollection.updateOne(
        { "_id": new ObjectId(reviewId) },
        { $set: updateFields }
      );
      if (result.modifiedCount === 0) {
        throw new Error('No changes made to the document.');
      }
      return result;
    } finally {
      console.log("DB closing connection");
      await client.close();
    }
  };
  
  reviewDB.deleteReview = async (reviewId) => {
    const { client, db } = await connectToMongoDB();
    const reviewsCollection = db.collection("Bars");
    try {
      const result = await reviewsCollection.deleteOne({ "_id": new ObjectId(reviewId) });
      if (result.deletedCount === 0) {
        throw new Error('Review not found or already deleted.');
      }
      return result;
    } finally {
      console.log("DB closing connection");
      await client.close();
    }
  };



  return reviewDB;
}

export const reviewDB = ReviewDB();
