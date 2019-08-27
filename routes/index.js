var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res){
  res.render('index', {
    title: 'Index', 
    message: 'Hello there!'
  });
});

router.get('/about', function(req, res){
  res.render('about', {
    title: 'About', 
    message: 'Hello there!'
  });
});

router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact', 
    message: 'Hello there!'
  });
});

router.get('/astronauts', function (req, res, next) {
  console.log('Fetching data from another API');

  http.get('http://api.open-notify.org/astros.json', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      parsedJson = JSON.parse(data);
      console.log('Number of astronauts in space: ', parsedJson.number);
      res.render('contact', {
        title: 'Number of Astronauts', 
        message: 'Number of Astronauts' + parsedJson.number
      });
    });

  }).on("error", (err) => {
    console.log("Uh oh! ", err.message);
  });
});


module.exports = router;