(function() {
    var sse = new EventSource("/sse");
    sse.onmessage = function (event) {
        if (event.data.indexOf(".less") !== -1 || event.data.indexOf(".css") !== -1) {
            less.refresh();
        } // refresh LESS, rebuild site CSS
        else { window.location.reload(); }                  // refresh other resources (e.g. markdown, JSON)
    };
}());
