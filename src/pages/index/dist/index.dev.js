"use strict";

var _vue = _interopRequireDefault(require("vue"));

require("vue-material/dist/theme/default.css");

require("../../assets/css/sprite.css");

require("vuetify/dist/vuetify.min.css");

require("../../assets/css/reset.css");

var _vuex = _interopRequireDefault(require("vuex"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

var _index = _interopRequireDefault(require("../../store/index"));

var _vuetify = _interopRequireDefault(require("vuetify"));

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// Ensure you are using css-loader
// Ensure you are using css-loader
_vue["default"].use(_vuex["default"]);

_vue["default"].use(_vueI18n["default"]);

_vue["default"].use(_vuetify["default"], {
  theme: {
    app_bg: "#E235A6",
    tab_text_color: "#9E00E8",
    activity_time_color: "#F8D5D5",
    top_anchor_name_color: "#333333",
    top_anchor_gift_color: "#999999",
    divider_color: "#F2F2F2",
    pink_color: "#FF1A86"
  }
});

_vue["default"].use(_vueLazyload["default"]);

var getParamValue = function getParamValue(url, key) {
  var regex = new RegExp(key + "=([^&]*)", "i");

  if (url.match(regex)) {
    return url.match(regex)[1];
  } // return "ar";

};

window.plat = getParamValue(window.location.href, "plat") || "android";
window.jid = getParamValue(window.location.href, "jid") || "anchor_1019281@bj2.1-1.io";
var countryCodeArr = ['en', 'ar', 'de', 'es', 'fr', 'hi', 'in', 'tr', "ko", "zh_TW", "ja"]; // let countryCodeArr=['en','ar','hi','tr'];

var countryCode = getParamValue(window.location.href, "lang") || 'en';
var countryResult = false;

for (var _i = 0, _countryCodeArr = countryCodeArr; _i < _countryCodeArr.length; _i++) {
  var x = _countryCodeArr[_i];

  if (countryCode.includes(x)) {
    countryResult = x;
  }
}

window.lang = countryResult || "en";
var i18n = new _vueI18n["default"]({
  // locale: getParamValue(window.location.href, "lang"), // 语言标识
  locale: window.lang,
  // 语言标识
  // this.$i18n.locale, // 通过切换locale的值来实现语言切换
  messages: {
    en: require("../../common/lang/en"),
    ar: require("../../common/lang/ar"),
    de: require("../../common/lang/de"),
    es: require("../../common/lang/es"),
    fr: require("../../common/lang/fr"),
    hi: require("../../common/lang/hi"),
    "in": require("../../common/lang/in"),
    tr: require("../../common/lang/tr"),
    ko: require("../../common/lang/ko"),
    zh_TW: require("../../common/lang/zh_TW"),
    ja: require("../../common/lang/ja") // zh: require("../../common/lang/zh")

  }
});

function jumpConnect() {
  var packageName = getParamValue(window.location.href, "packageName");
  var versionCode = parseInt(getParamValue(window.location.href, "versionCode"));
  window.bool = false;
  var packages = [];

  if (window.plat == 'android') {
    packages = [{
      title: 'com.cherru.video.live.chat',
      versionCode: 3
    }, {
      title: 'com.yochat.freechat',
      versionCode: 3
    }, {
      title: 'com.live.videochat.india',
      versionCode: 27
    }, {
      title: 'com.zakzak.lite.chat',
      versionCode: 6
    }, {
      title: 'com.zakzak.live.chat',
      versionCode: 12
    }, {
      title: 'com.zaku.live.chat',
      versionCode: 5
    }, {
      title: 'com.fachat.freechat',
      versionCode: 20
    }];
  } else {
    packages = [{
      title: 'com.fachat.freechat',
      versionCode: 17
    }, {
      title: 'com.parame.chat',
      versionCode: 14
    }, {
      title: 'com.yepop.videochat',
      versionCode: 20
    }, {
      title: 'com.fachat.lite.freechat',
      versionCode: 13
    }];
  }

  packages.map(function (item) {
    if (packageName == item.title && versionCode >= item.versionCode) {
      window.bool = true;
    }
  });
}

jumpConnect();
_vue["default"].config.productionTip = false;
/* eslint-disable no-new */

var app = new _vue["default"]({
  el: "#app_content",
  i18n: i18n,
  components: {
    App: _App["default"]
  },
  template: "<App/>",
  store: _index["default"]
});