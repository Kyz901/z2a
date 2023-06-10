import express = require('express');

const port = 8082;
const app = express();
const http = require('http');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mainErrorHandler);

app.use('/v1', require('./api/router'));

const server = http.createServer(app);

function mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}

server.listen(port, () => console.log(`Listening on port: ${port}`));

