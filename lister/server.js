const express = require('express'); // import express
const cors = require("cors"); // import cors
const app = express();
app.use(express.json());
app.use(express.urlencoded());

//Allow Cors
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(cors());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('theme/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'theme', 'build', 'index.html'))
  })

}

var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "a0a9Rl7i"
};
var request = new OAuth.OAuth(null,null,'dj0yJmk9MGFxeWo3WERpRWx6JmQ9WVdrOVlUQmhPVkpzTjJrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTMz',
    'b679d208370a778a5f0396c0992d9ae89ccc21a8','1.0',null,'HMAC-SHA1',null,header
);
var city;
///Routes
app.post(`/upload`, async (req, res) => {
    const result = req.body
    city = result.data.city;
    request.get(
        'https://weather-ydn-yql.media.yahoo.com/forecastrss?location='+result.data.city+'&format=json',
        null,
        null,
        function (err, data, result) {
         
           var resultWeather = JSON.parse(data);
          
            if (err) {
            } else {
              db.insertMany([{city: city, ip: req.connection.localAddress,wind: JSON.stringify(resultWeather.current_observation.wind), atmosphere: JSON.stringify(resultWeather.current_observation.atmosphere), condition: JSON.stringify(resultWeather.current_observation.condition), pubDate: JSON.stringify(resultWeather.pubDate), forecast: JSON.stringify(resultWeather.forecast), date: new Date()}],(err, res) => {

              })
                return res.json(data)
            }
        }
    );
     
  })

  app.post(`/getHistory`, async (req, res) => {
    var ip = req.connection.localAddress
    db.find( {ip:req.connection.localAddress} ,(err, response) => {
      return res.json(response)
    }).sort( { date: -1 } )     
  })  

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
