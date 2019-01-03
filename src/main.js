// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App';
import VueRouter from 'vue-router';
import router from './router/index.js';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import 'jquery';
import store from './store/index.js';
import axios from 'axios';
import './common/js/tool.js';
// 引入公共样式
import './assets/css/index.css';

// 定义公共按钮变量
Vue.prototype.resButton = null;
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(ElementUI, {locale});
Vue.use(VueRouter);
Vue.config.productionTip = true;
// 国际化start
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: '', // set locale
    messages: {
        'zh': require('./assets/lang/zh'),
        'en': require('./assets/lang/en'),
        'ja': require('./assets/lang/ja')
    }
});

let language = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
if (language.indexOf('en') > -1) i18n.locale = 'en';
else if (language.indexOf('zh') > -1) i18n.locale = 'zh';
else i18n.locale = 'zh';
// 国际化end

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: {App}
});
