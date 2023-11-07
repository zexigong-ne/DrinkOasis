import express from "express";
import api from "./routes/api.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "vite-project", "dist");

app.use(express.static(frontendPath));
app.use(express.json());

app.use("/api", api);
app.use("/userApi", userApi);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
