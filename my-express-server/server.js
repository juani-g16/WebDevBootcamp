//jshint esversion:6
const express = require('express');

const app=express();

app.get("/",function(req,res) {
  res.send("<h1>Hello<\h1>");
});

app.get("/about", function (req, res) {
  res.send("<h3>I'm an electronics engineer from Paraná, Argentina<\h3>");
});
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
