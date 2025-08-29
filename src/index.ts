import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import articleRouter from "./routes/article.router";
import authRouter from "./routes/auth.routes";
import homeRouter from "./routes/home.router";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/", homeRouter);
app.use("/articles", articleRouter);
app.use("/auth", authRouter);
app.get("/ping", (_req, res) => res.status(200).json({ message: "pong" }));

// Start server
app.listen(port, () => {
  console.log(`Server up and running on http://127.0.0.1:${port}`);
});
