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
        GRAVITY: 0.002,
        FLAP: 2.5,
        FLAPMAX: 3.5
    };
});