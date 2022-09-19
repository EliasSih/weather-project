const express = require("express");
const app = express();
const https = require("https");
const bodyParser  = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  console.log("Post Received");
  console.log(req.body.cityName);
  const city = req.body.cityName;
  const apiKey = "87798de2c9e46063fd17a30f997f2401"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey + ""
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconID = weatherData.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/"+ iconID + "@2x.png"
      res.write("<p>The weather is currently" + description + "</p>");
      res.write("<h1>The temperature in " + city +" is " +temp+ " </h1>");
      res.write("<img src="+icon+">")
      res.send();
      console.log(temp);
      console.log(description);
      console.log(weatherData);
    });
  });
});

app.listen(3000, function(){
  console.log("The server is running on port 3000");
})
