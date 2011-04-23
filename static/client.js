
define(function(require, exports, module) {
         
       exports.addTip = function() {
            console.log("adding tip form");
            var variables = {"username" : "achiel"};
            $.get("http://ismoke:3000/addtip.html", function(tipform) {
                    var html = Mustache.to_html(tipform, variables);
                    $("#form").html(html);
                }); 
        } 
        console.log("superkoud-js loaded..");
    }
);
