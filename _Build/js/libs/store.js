(function (root, factory) {
    "use strict";
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        /* istanbul ignore next */
        define(
                'vuex', 
                'vuex-persistedstate', 
                'vue', 
                'utility', 
            factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
                require('vuex').default, 
                require('vuex-persistedstate').default, 
                require('vue').default, 
                require('utility')
            );
    } else {
        /* istanbul ignore next */
        root.Store = factory(
                root.Vuex, 
                root.VuexPersistedState, 
                root.Vue, 
                root.Utility
            );
    }
    /* istanbul ignore next */
})(window, function (Vuex, VuexPersistedState, Vue, Utility) {
    "use strict";

    Vue.use(Vuex);

    return new Vuex.Store({
        plugins: [VuexPersistedState()],
        state: {
        },

        mutations: {
        }
    });
});