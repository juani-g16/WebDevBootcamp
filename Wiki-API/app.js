//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

const wikiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "No title specified"] //validation
  },
  content: {
    type: String,
    required: [true, "No content specified"] //validation
  }
});

const Article = mongoose.model("Article", wikiSchema);

//---------------------Target all articles---------------//
app.route("/articles")
.get(function (req,res) {
  Article.find(function (err,foundArticles) {
    if (err) {
      res.send(err);
    } else {
      res.send(foundArticles);
    }
  });
})

.post(function (req,res) {

  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
  });

  newArticle.save(function (err) {
    if (!err) {
      res.send("Successfully added a new article")
    } else {
      res.send(err);
    }
  });
})

.delete(function (req,res) {
  Article.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully deleted all articles")
    } else {
      res.send(err);
    }
  });
})

//---------------------Target a specific article---------------//
app.route("/articles/:articleTitle")
.get(function (req,res) {
  const art=req.params.articleTitle;
  Article.findOne({title:art},function (err,foundArticle) {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No article was found!");
    }
  });
})

.put(function (req,res) {
    const art=req.params.articleTitle;
    const titl=req.body.title;
    const cont=req.body.content;
    Article.updateOne(
      {title:art},
      {title:titl,content:cont},
      //{overwrite:true},
      function (err) {
          if(!err){
            res.send("Successfully updated article.")
          }
      }
    );
})

.patch(function (req,res) {
    const art=req.params.articleTitle;
    const body=req.body;
    Article.updateOne(
      {title:art},
      {$set:body},
      //{overwrite:true},
      function (err) {
          if(!err){
            res.send("Successfully updated article.")
          }else {
            res.send(err);
          }
      }
    );
})

.delete(function (req,res) {
  const art=req.params.articleTitle;
  Article.deleteOne(
    {title:art},function (err) {
      if (!err) {
        res.send("Article deleted successfully");
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
