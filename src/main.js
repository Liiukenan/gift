// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'vue-material/dist/theme/default.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

import store from './store'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';
import Vuetify from 'vuetify';

Vue.use(VueOnsen);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(Vuetify,{
  theme:{
    app_bg:'#E235A6',
    tab_text_color:'#9E00E8',
    activity_time_color:'#CCF8F0FA'
  }
});


const i18n = new VueI18n({
  locale: lang,    // 语言标识
  // this.$i18n.locale, // 通过切换locale的值来实现语言切换
  messages: {
    'en': require('./common/lang/en'),    // 英文语言包
    'zh': require('./common/lang/zh')     // 中文语言包
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  components: { App },
  template: '<App/>',
  store
});
