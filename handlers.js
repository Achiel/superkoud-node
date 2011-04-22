var superkoud = require('./superkoud'),
express = require('express'),
connect = require('connect'),
static = require('node-static');

var username = 'achiel';

var file = new(static.Server)('./forms/');
var server = express.createServer(
);
server.use(express.static(__dirname + '/static'));
server.use(express.bodyParser());

server.get('/user/', superkoud.getAllUsers);

server.get('/user/:id', superkoud.getUser);
server.get('/user/:id/:key', superkoud.getAttribute);
server.put('/user/:id/:key/', superkoud.editAttribute);
server.post('/user/:id/:key/', superkoud.createAttribute);
server.delete('/user/:id/:type/:key', superkoud.deleteAttribute);


exports.server = server;
