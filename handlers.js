var superkoud = require('./superkoud');
var express = require('express');

var server = express.createServer();
server.use(express.bodyParser());

var username = 'achiel';

function checkSession(req, res, next)
{
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
server.get('/user/', superkoud.getAllUsers);

server.get('/user/:id', superkoud.getUser);
server.get('/user/:id/:key', superkoud.getAttribute);
server.put('/user/:id/:key/', checkSession, superkoud.editAttribute);
server.post('/user/:id/:key/', checkSession, superkoud.createAttribute);
server.delete('/user/:id/:type/:key', checkSession, superkoud.deleteAttribute);


exports.server = server;
