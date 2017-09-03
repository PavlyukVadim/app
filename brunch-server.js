const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

module.exports = (config, callback) => {
  https.createServer({
  	key: fs.readFileSync('key.pem'),
  	cert: fs.readFileSync('cert.pem')
	}, app).listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}!`);
    callback();
  });

  return app;
};
