(function (root, factory) {
    "use strict";
    /* istanbul ignore next */
    if ( typeof define === 'function' && define.amd ) {
        /* istanbul ignore next */
        define(factory);
    } else if ( typeof exports === 'object' ) {
        module.exports = factory();
    } else {
        /* istanbul ignore next */
        root.Utility = factory();
    }
    /* istanbul ignore next */
})(window, function () {
    "use strict";

    var Utility = {
        eachNode: function(nodes, cb){
            nodes = document.querySelectorAll(nodes);
            
            for(var i = 0, len = nodes.length; i < len; i++){
                cb(nodes[i], i);
            }
        },
        parse_query_string: function(query) {
            var vars = query.split("&");
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        },
        load: function(path, cb, mimetype) {
            var xobj = new XMLHttpRequest();
            if(mimetype){
                xobj.overrideMimeType(mimetype);
            }
            xobj.open('GET', path, true);
            xobj.onreadystatechange = function () {
                if(xobj.readyState === 4 && (+xobj.status === 200 || +xobj.status === 0)){
                    cb(xobj.responseText);
                }
            };
            xobj.send(null);  
        },
        send: function(path, data){
            var xobj = new XMLHttpRequest();
            xobj.open('POST', path, true);
            xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xobj.onload = function () {
               var status = xobj.status; // HTTP response status, e.g., 200 for "200 OK"
               var data = xobj.responseText; // Returned data, e.g., an HTML document.
            };

            xobj.send(JSON.stringify(data));
        },
        classList: function(el) {
            var list = el.classList;

            return {
                toggle: function(c) { list.toggle(c); return this; },
                add:    function(c) { list.add   (c); return this; },
                remove: function(c) { list.remove(c); return this; }
            };
        }
    };

    return Utility;
});