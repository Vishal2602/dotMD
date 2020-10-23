const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Article = require("./models/article");
const articalRouter = require("./routes/articles");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("DATABASE CONNECTED"));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articalRouter);

app.listen(5000, () => {
  console.log("SERVER STARTED...");
});
