var express = require('express');
var mysql = require('mysql');
//var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var qs = require('querystring');
//var rootPath = path.normalize(__dirname + '/../');

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

app.post('/ServerRequest/PostDataResponse', function (req, res) 
{
    res.send('hello1');
    res.write('hello2');
    res.end('hello3');
});

/*
var db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boreholetracker'
})
.connect((err) => 
{
    if(err)
    {
        console.log('DBCon Error: ' + err);
    }
    else
    {
        console.log('Connected to DB');
    }
});

console.log("in node");

app.post('/add', (request, res) => 
{
    request.write('req : ' + request);
    /*let post = {boreholename:$scope.borname, boreholetype:$scope.bortype, latitude:$scope.borlat, longitude:$scope.borlng, elevation:$scope.borele}
    let sql = 'Insert into boreholes set ?';
    let query = connection.db.query(sql, post, (err, res) => 
    {
        if(err)
        {
            console.log('Add Error: ' + err);
        }
        else
        {
            console.log('Borehole Added');
            console.log(res);
            $scope.msg = "Borehole " + $scope.borname + " added successfully";
        }
    })
});*/
