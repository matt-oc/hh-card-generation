var http = require('http');
var fs = require('fs');
var fileName = 'cards/card.html';
var stream = fs.createWriteStream(fileName);


//create a server to host our webpage
http.createServer(function (req, res) {
  var html = buildHtml(req);
  
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(8080); //check port suitable if hosted
console.log("Server listening on port 8080");


// Build the html itself, including variables
function buildHtml(req) {
  var header = '';
  var body = 'test';
  var var1 = "working variable";
  var supLogo = "http://3t6ba91znr5aftsk8zjscc91.wpengine.netdna-cdn.com/wp-content/uploads/2014/02/SSE-Airtricity-logo-670x310.jpg"
  
  return '<!doctype html>\n<html lang="en">\n' +  
  '\n<meta charset="utf-8">\n<title>Home Hero Report Card</title>\n' + 
  '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
  '\n\n<h1 style="width 100%;">Home Hero card test' + var1 + '</h1>\n' + 
  '<div id="content" style="float:left"><p>Price comparison</p><ul><li>one</li><li>two</li><li>three</li><li>four</li></ul></div>' + 
  '\n\n' + '<img src="'+ supLogo + '"/>';
};

stream.once('open', function(fd) {
  var html = buildHtml();
  stream.end(html);
  
  
  //Use nightmare js to visit out webpage and take a screenshot of it
  var Nightmare = require('nightmare');
  var createCard = new Nightmare()
  .viewport(500, 5000)
  .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
  .goto('http://localhost:8080/')
  .wait(3000)
  .screenshot( 'cards/'+ new Date().toISOString() + '-test.png')
  .run(function (err, nightmare) {
    if (err) return console.log(err);
    console.log('image successful!');
    process.exit(); // closes the web server once image taken
  });  
});


