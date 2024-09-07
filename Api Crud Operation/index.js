const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const postRouter = require('./src/api/routes/posts.router')

//------------------------ Url -------------------- //
app.use(express.static('./public/html/'));

//----------------Database Connection -------------------------- //
const connection = require("./src/config/db");

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) 

//-------------------- Api -------------------- //
app.use("/api/v1/", postRouter);

//------------------------ Web ------------------- //
app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  try {
    const [result] = await connection.query("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content]);
    console.log("Data inserted successfully", result);
    res.redirect('/create');
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/create', (req, res) => {
  res.redirect('create.html');
});

app.listen(process.env.PORT || 4000, (error) => {
  if (error) throw error;
  console.log("Server Running..." + (process.env.PORT || 4000));
});
