
define(function(require, exports, module) {
         
       exports.addTip = function() {
            console.log("adding tip form");
            var variables = {"username" : "achiel"};
            $.get("/addtip.html", function(tipform) {
                    var html = Mustache.to_html(tipform, variables);
                    $("#form").html(html);
                }); 
        } 
        console.log("superkoud-js loaded..");
    }
);
