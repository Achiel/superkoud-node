
define(function(require, exports, module) {
         
       exports.addTip = function() {
            console.log("adding tip form");
            var variables = {"username" : "achiel"};
            $.get("/addtip.html", function(tipform) {
                    var html = Mustache.to_html(tipform, variables);
                    $("#form").html(html);
                }); 
        } 
        exports.viewUsers = function() {
            console.log(sequencer);
            var getTipForm = function(callback) {
                  $.get("/tips.html", function(tipform) {
                  // crappy temp solution until we discover how to do this neatly:
                  parent.tipform = tipform;
                  callback();
              });
            };
            var getUsers = function(callback) {
                  $.get("/user/", function(data) {
                      // crappy temp solution until we discover how to do this neatly:
                      parent.users = data;
                      callback();
                  });
            };
            var getUser =  function(username) {
                $.get("/user/" + username, function(user) {
                    console.log(user);
                    var html = Mustache.to_html(tipform, user);
                    $("#tips").append(html);
                });
            };
            var displayUsers = function() {
                console.log("gonig to display users");
                for (user in users) {
                    getUser(users[user]);
                }
            };
            var actions = [getUsers,getTipForm];
            sequencer.collect(actions, displayUsers);
        }
        console.log("superkoud-js loaded..");
    }
);
