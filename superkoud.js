var cradle = require('cradle');
var json = require('./json2');
console.log(JSON);
for (a in JSON)
    console.log(a);
var superkoud = function() {};

var c = new(cradle.Connection)('localhost', 5984, 
{
    cache: true,
    raw: false
});
var db = c.database('superkoud');

exports.getAllUsers = function(req, res)
{
    var result = [];
    db.view('superkoud/usernames', function (err, docs) 
    {
        getusername = function(doc) {  return doc;}
        res.send(docs.map(getusername));
    });
}
exports.getUser = function(req, res)
{
    db.get(req.params.id, function (err, doc) 
    {
        res.send(doc);
    });
}
exports.getAttribute = function(req, res)
{
    user = exports.getUser(req.params.id);
    res.send(user[req.params.key]);
}

exports.editAttribute = function(req, res)
{
    db.get(req.params.id, function (err, doc) 
    {
        raw_data = req.body['data'];
        for (title in req.body) 
        {
            if (!doc[req.params.key][title])
            {
                res.statusCode = 410;
                res.send("Can't update that " + req.params.key + ", it doesn't exist!");
                return;
            }
            doc[req.params.key][title] = JSON.parse(req.body[title]);
        }

        db.save(req.params.id, doc, errorHandler);
        res.send(doc);
    });
}

exports.createAttribute = function(req, res)
{
    db.get(req.params.id, function (err, doc) 
    {
        raw_data = req.body['data'];
        if (doc[req.params.key][req.body.title])
        {
            res.statusCode = 409;
            res.send("Can't create that " + req.params.key + ", it already exists!");
            return;
        }
        doc[req.params.key][req.body.title] = req.body;

        db.save(req.params.id, doc, errorHandler);
        res.send(doc);
    });
}

exports.deleteAttribute = function(req, res)
{
    db.get(req.params.id, function (err, doc) 
    {
        if (!doc[req.params.type] || !doc[req.params.type][req.params.key])
        {
            res.statusCode = 410;
            res.send("Can't delete that, it's not here");
            return;
        }
        delete doc[req.params.type][req.params.key];
        db.save(req.params.id, doc, errorHandler);
        res.send('ok!');
    });
}

function replaceAll(param) { return escape(param.replace(/ /g, "+"));}

function errorHandler(err, res)
{
    if (err)
        console.log("oops" + err);
    else
        console.log("result: " + res);
}
