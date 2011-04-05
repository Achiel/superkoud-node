var cradle = require('cradle');
var json = require('./json2');
var superkoud = require('./superkoud');
var express = require('express');
var http = express.createServer();
http.use(express.bodyParser());

var users = ['achiel', 'muriel'];
var username = 'achiel';

function checkSession(req, res, next)
{
    console.log('checking session for ' + req.params.id);
    if (username == 'achiel')
        next();
    else
        next(new Error('User not logged in'));
}

http.get('/', 
    function(req, res)
    {
        res.send('hello world');
    }
);
http.get('/user/', 
    function(req, res)
    {
        console.log('get all users');
        res.send(users.map(superkoud.getUser));
    }
);

http.post('/user/', //checkSession,
        function (req, res)
        {
          console.log('post users');
          for (var key in req.body) {
              if (req.body.hasOwnProperty(key)) {
                  console.log(key);
              }
          }
          raw_json = req.body.data;
          console.log("found raw json " + raw_json);
          decoded = JSON.parse(raw_json);

          console.log(decoded);
          superkoud.createUser(decoded.username);
          res.send('flup');
        }
);
http.get('/user/:id', 
    function(req, res)
    {
        user = superkoud.getUser(req.params.id);
        res.send(user);
    }
);
http.get('/user/:id/:key', 
    function(req, res)
    {
        user = superkoud.getUser(req.params.id);
        res.send(user[req.params.key]);
    }
);


exports.server = http;
