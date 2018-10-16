// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vue-material/dist/theme/default.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

import store from '../../store/index'
import Vuetify from 'vuetify';
import VueLazyload from 'vue-lazyload';
import Result from './AppResult'


Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(Vuetify,{
  theme:{
    app_bg:'#E235A6',
    tab_text_color:'#9E00E8',
    activity_time_color:'#F8D5D5',
    top_anchor_name_color:'#333333',
    top_anchor_gift_color:'#999999',
    divider_color:'#F2F2F2',
    indigo:'#FF1A86'
  }
});
Vue.use(VueLazyload);

const i18n = new VueI18n({
  locale: lang,    // 语言标识
  // this.$i18n.locale, // 通过切换locale的值来实现语言切换
  messages: {
    'en': require('../../common/lang/en'),
    'ar': require('../../common/lang/ar'),
    'de': require('../../common/lang/de'),
    'es': require('../../common/lang/es'),
    'fr': require('../../common/lang/fr'),
    'hi': require('../../common/lang/hi'),
    'in': require('../../common/lang/in'),
    'tr': require('../../common/lang/tr'),
    'zh': require('../../common/lang/zh')
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  el: '#app_result',
  i18n,
  components: { Result },
  template: '<Result/>',
  store,
});
