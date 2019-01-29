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
        GRAVITY: 0,//5,
        FLAP: 0,//2,
        FLAPMAX: 3.5,
        BGSPEED: 100,
        SPEED: 40
    };
});