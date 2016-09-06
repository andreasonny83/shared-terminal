var express = require('express');
var fs = require('fs');
var lwip = require('lwip');

var app = express();

function readImage(res) {
  lwip.open('public/templates/001.png', function(err, image) {
    // image.scale(0.5, function(err, image) {
      console.log(image);
      image.batch().blur(10);
      res.status(200).set('Content-Type', 'image/png').send(image);
    // });
  });
}
app.get(/^\/api\/(.*)/, function(req, res) {
  // Default configuration
  var config = {
    theme: 13,
    squares: '',
    command: '',
    type: 'png'
  };

  // Parse URL parameters and set right configurtion
  var params = req.params[0].toUpperCase().split('/');
  params = (params === null)? [] : params;

  console.log(params);

  // fs.readFile('./public/templates/002.jpg', function(err, data) {
  //   if (err) {
  //     return res
  //       .status(404)
  //       .set('Content-Type', 'text/html')
  //       .send('<div style="text-align:center;padding:100px,0;"><h1>404</h1><h2>Ooops, something went wrong</h2></div>');
  //   }
  //
  //   res.status(200)
  //      .set('Content-Type', 'image/png')
  //      .send(data);
  // });

  readImage(res);
});

app.listen('3003', function() {
  console.log('App listening on port 3003!');
});
