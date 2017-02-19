console.log("Starting");
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');


app.listen(8080, '138.197.11.6');

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

io.set('origins', '*');
io.on('connection', function(socket)
{
  console.log("Hello World");
  socket.emit('news', {hello: 'world'});
});

//Retrieve
var MongoClient = require('mongodb').MongoClient;

//Connect to the DB
MongoClient.connect("mongodb://localhost:27017/twitter", function(err, db)
{
  if (err) {return console.dir(err);}
  var tweets = db.collection('tweets');
  var numTweets = 0;
  var selectionArray = tweets.find();
  while (selectionArray.hasNext() && numTweets < 6)
  {
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["parseTweets.py", selectionArray.next()]);
    process.stdout.on('data', function(data)
    {
      io.sockets.emit('update-msg', { tweetData: data});
    })
    // Call for change
    numTweets++;
  }
});
