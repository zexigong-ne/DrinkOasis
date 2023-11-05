import express from "express";
import { reviewDB } from "../modules/reviewDB.js";

const router = express.Router();

// Get all reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await reviewDB.getAllReviews();
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Insert review
router.post('/reviews', async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: "Please log in first" });
    }
    
    try {
        const review = req.body;
        review.userId = req.session.user.id;

        const result = await reviewDB.insertReview(review);
        res.json(result);
    } catch (error) {
        console.error("Error inserting review:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
