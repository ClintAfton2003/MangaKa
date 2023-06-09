import { connect } from "./configs/connect";
connect();

import express from "express";
import authRoute from "./routes/authRoute";
import mangaRoute from "./routes/mangaRoute";
import chapterRoute from "./routes/chapterRoute";
import commentRoute from "./routes/commentRoute";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/manga", mangaRoute);
app.use("/api/v1/chapter", chapterRoute);
app.use("/api/v1/comment", commentRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`Connecting to MangaKa`));
