var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(express.static(rootPath));

http.createServer((req, res) => 
{
    console.log('Server Created');
})
.listen(8080, () =>
{
    console.log('Listening on :8080');
});

