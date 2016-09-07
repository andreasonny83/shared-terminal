var express = require('express');
var gm = require('gm').subClass({imageMagick: true});

var app = express();
app.set('port', (process.env.PORT || 3003));

function renderImage(res, img) {
  res.status(200).set('Content-Type', 'image/png').send(img);
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

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

  gm('public/templates/001.png')
    .fontSize(26)
    .fill('#eaeaea')
    .drawText(95, 210, "> sample text\nnew line")
    .toBuffer('PNG',function (err, buffer) {
      if (err) throw err;

      renderImage(res, buffer);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
