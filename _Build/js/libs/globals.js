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
        root.Filters = factory();
    }
    /* istanbul ignore next */
})(window, function () {
    "use strict";

    return {
        ENDPOINT: 'http://192.168.0.124:8080',
        GRAVITY: 5,
        GRAVITYMAX: 125,
        FLAP: 1.5,
        FLAPMAX: 2,
        FLAPLENGTH: 250,
        BGSPEED: 100,
        SPEED: 40,
        GAP: 35,
        GAPDIFF: 25,
        FREQUENCY: 2000
    };
});