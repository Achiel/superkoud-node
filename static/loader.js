require([ "sequencer", "client"], function(sequencer, client) {

    require.ready(function() {
        parent.superkoud = client;
        console.log("starting load sequence..");

        $.getJSON("http://ismoke:3000/user/achiel", function(data) {
            $.get("http://ismoke:3000/tips.html", function(templateData) {
                tips = data.tips; 
                var html = Mustache.to_html(templateData, tips);
                $("#temp").html(html);
            });
        });

        $.get("http://ismoke:3000/menu.html", function(data) {
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
