//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "02ebc478ddf8b9690121d70d4921a9b5";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/find?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const weatherDesc = weatherData.list[0].weather[0].description;
      const temp = weatherData.list[0].main.temp;
      const icon = "https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is " + temp + " deg C<\h1>");
      res.write("<h2>The weather is currently " + weatherDesc + "<\h2>" + "<img src=" + icon + "\>");
      res.send();
    });
  });
});


app.listen(3000);
