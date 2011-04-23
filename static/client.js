
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
            $.get("/user/", function(data) {
                console.log(data);
                $.get("/tips.html", function(tipform) {
                    for (user in data) {
                        console.log("going after " + data[user]);
                        $.get("/user/" + data[user], function(user) {
                            var html = Mustache.to_html(tipform, user);
                            $("#tips").append(html);
                            console.log(user);
                        });
                    }
                });
            });
        }
        console.log("superkoud-js loaded..");
    }
);
