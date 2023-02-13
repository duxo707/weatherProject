const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    const city = req.body.cityName;
    const apiId = "19b1db555832dca9c60b6946c85b4367";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiId + "&units=metric";
    https.get(url, function(response) {
         response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>the temperature in " + city + " is " + temp + " degrees celcius</h1>");
            res.write("<p>the weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + img + ">");
            res.send();
         });
    });
});

app.listen(3000, function () {
    console.log("server is running on port 3000");
});