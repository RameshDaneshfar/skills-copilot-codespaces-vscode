//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
http.createServer(function(req, res) {
    //Parse the request
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        //read the file content
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.end(data.toString());
            }
        });
    } else if (pathname === '/addComment') {
        //read the data
        var comment = urlObj.query;
        comments.push(comment);
        //send the added comment back to client
        res.end(JSON.stringify(comments));
    } else {
        //read the file content
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.end(data.toString());
            }
        });
    }
}).listen(8080, function() {
    console.log('server is listening on 8080');
});