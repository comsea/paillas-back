import express from "express";
import cors from "cors";
var cors = require('cors')
import path from "path";
import articleRouter from "./routes/article.router";
import authRouter from "./routes/auth.routes";
import homeRouter from "./routes/home.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

app.use("/", homeRouter);

// servir /public (tes pages) et /uploads (les images)
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/articles", articleRouter);
app.use("/auth", authRouter);

app.get("/ping", (_req, res) => res.status(200).json({ message: "pong" }));

app.listen(port, () => {
  console.log(`Server up and running on http://127.0.0.1:${port}`);
});
