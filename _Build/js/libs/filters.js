(function (root, factory) {
    "use strict";
    /* istanbul ignore next */
    if ( typeof define === 'function' && define.amd ) {
        /* istanbul ignore next */
        define('vue', factory);
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(require('vue').default);
    } else {
        /* istanbul ignore next */
        root.Filters = factory(root.Vue);
    }
    /* istanbul ignore next */
})(window, function (Vue) {
    "use strict";

    Vue.filter('toFixed', function (value, decimals) {
        return value.toFixed(decimals);
    });
});