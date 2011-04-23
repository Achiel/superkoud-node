require([ "sequencer", "client"], function(sequencer, client) {

    require.ready(function() {
        parent.sequencer = sequencer;
        parent.superkoud = client;
        console.log("starting load sequence..");

        $.getJSON("/user/achiel", function(data) {
            $.get("/tips.html", function(templateData) {
                tips = data.tips; 
                var html = Mustache.to_html(templateData, tips);
                $("#temp").html(html);
            });
        });

        $.get("/menu.html", function(data) {
            $("#menu").html(data);
        });
    });
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
