// Create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var comments = [];

http.createServer(function (req, res) {
    // Parse the request URL
    var url_parts = url.parse(req.url);

    // Determine the file path
    var path = url_parts.pathname;

    // Determine the request method
    var method = req.method;

    if (method == 'GET' && path == '/getComments') {
        // Return the comments array
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(comments));
    } else if (method == 'POST' && path == '/addComment') {
        // Read the request body
        var body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            // Parse the request body
            var newComment = JSON.parse(body);

            // Add the new comment to the comments array
            comments.push(newComment);

            // Return the comments array
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(comments));
        });
    } else {
        // Return a 404 response
        res.writeHead(404, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.end('Page not found');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');