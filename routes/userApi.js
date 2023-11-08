import express from "express";
import session from "express-session";
const router = express.Router();
import { userDB } from "../modules/userDB.js";

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const diaryCollection = [];
    const maxId = await userDB.getMax();

    const userToInsert = {
      id: maxId + 1,
      username: username,
      email: email,
      password: password,
      diaries: diaryCollection,
    };

    const result = await userDB.insertUser(userToInsert);

    res.json({ message: "User inserted successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// router.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await userDB.verifyUser(username, password);

    if (result.success) {
      req.session.user = { id: result.user.id, username: username };
      console.log(res.status);
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      console.log("Authentication failed:", result.message);
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("An error occurred during user verification:", error);

    console.error("Error during verification:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Successfully log out");
      res.status(200).json({ message: "Logout successful" });
    }
  });
});

router.get("/diaries", async (req, res) => {
  try {
    const { username } = req.query;
    console.log("api: ", username);

    const result = await userDB.getDiaries(username);
    console.log("result.status:", result.status);
    if (result.status === 200) {
      res.json(result.diariesCollection);
    } else {
      res.status(result.status).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteDiary/:diaryId", async (req, res) => {
  const { username } = req.query;
  const diaryId = req.params.diaryId;

  try {
    const result = await userDB.deleteDiary(username, diaryId);
    if (result.status === 200) {
      res.status(200).json({ message: "Diary deleted successfully" });
    } else if (result.status === 404) {
      res.status(404).json({ message: "Diary not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
