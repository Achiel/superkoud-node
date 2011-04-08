var cradle = require('cradle');
var json = require('./json2');
var superkoud = require('./superkoud');
var http = require('http');
var express = require('express');
var c = new(cradle.Connection)('g', 5984, 
{
    cache: true,
    raw: false
});
var db = c.database('superkoud');

var server = express.createServer();
server.use(express.bodyParser());

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

server.get('/', 
    function(req, res)
    {
        res.send('hello world');
    }
);
server.get('/user/', 
    function(req, res)
    {
        var result = [];
        db.view('superkoud/usernames', function (err, docs) 
        {
            console.log(docs);
            getusername = function(doc) {  return doc;}
            res.send(docs.map(getusername));
        });
        console.log('get all users');
    }
);

server.post('/user/', //checkSession,
    function (req, res)
    {
        console.log('post users');
        for (var key in req.body) 
        {
            if (req.body.hasOwnProperty(key)) 
            {
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
server.get('/user/:id', 
    function(req, res)
    {
        console.log("getting " + req.params.id);
        db.get(req.params.id, function (err, doc) 
        {
            console.log(doc);
            res.send(doc);
        });
    }
);
server.get('/user/:id/:key', 
    function(req, res)
    {
        user = superkoud.getUser(req.params.id);
        res.send(user[req.params.key]);
    }
);
server.post('/user/:id/:key/', checkSession,
    function(req, res)
    {
        user = superkoud.getUser(req.params.id);
        raw_data = req.body['data'];
        data = JSON.parse(raw_data);
        user[req.params.key].push(data);
        console.log(user[req.params.key]);
        res.send('ok!');
    }
);
server.delete('/user/:id/:key', checkSession,
    function(req, res)
    {
        user = superkoud.getUser(req.params.id);
        delete user[req.params.key];
        res.send('ok!');
    }
);

exports.server = server;
