var express = require('express');
var fs = require('fs');
var lwip = require('lwip');

var app = express();

function renderImage(res, img) {
  res.status(200).set('Content-Type', 'image/png').send(img);
}

function readImage(res, overlay) {
  lwip.open('./public/templates/001.png', function(err, image) {
    image.batch().contain(800, 800).paste(0,0,overlay).toBuffer('png', {}, function(err, buffer) {
      renderImage(res, buffer);
    });
  });
}
app.get(/^\/api\/(.*)/, function(req, res) {
  res.set('Content-Type', 'image/png');

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

  fs.readFile('./public/templates/text.jpg', function(err, data) {
    readImage(res, data);
  });
  // lwip.create(500, 500, 'yellow', function(err, image) {
  //   if (err) throw err;
  //   res.status(200).send('image');
  // });
});

app.listen('3003', function() {
  console.log('App listening on port 3003!');
});
