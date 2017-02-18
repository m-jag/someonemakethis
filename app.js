var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');


app.listen(80);

function handler (req, res)
{
  fs.readFile(__dirname + '/index.html',
  function (err, data)
  {
    if (err)
    {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket)
{
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) 
  {
    console.log(data);
  });
});

// Make change
var socket = io.connect('http://localhost');
socket.on('update-msg', function (msg) {
    console.log(msg);
    $('.idea').html(msg.data)
});

//Retrieve
var MongoClient = require('mongodb').MongoClient;

//Connect to the DB
MongoClient.connect("mongodb://localhost:27017/twitter", function(err, db)
{
  if (err) {return console.dir(err);}
  var tweets = db.collection('tweets');
  var numTweets = 0;
  var selectionArray = tweets.find().toArray(function(err, items){});
  while (numTweets < 6)
  {
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["parse.py", selectionArray[numTweets]]);
    process.stdout.on('data', function(data){
      io.sockets.emit('update-msg', { tweetData: data});
    })
    // Call for change
  }
});
