import Vuex from 'vuex';
import Vue from 'vue';
import resource from './modules/resource.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        resource
    }
});
