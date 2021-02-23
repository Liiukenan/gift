"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _qs = _interopRequireDefault(require("qs"));

var _jsInteractive = require("../common/jsInteractive");

var _data = require("./data");

var _ApiHelper = require("./ApiHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

_vue["default"].use(_vueAxios["default"], _axios["default"]);

var isDev = process.env.NODE_ENV !== 'production';

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

var pkgname = getUrlParam('pkg');
var store = new _vuex["default"].Store({
  state: {
    rankingList: {},
    hasRewardResult: {},
    userGiftRate: {},
    anchorGiftRate: {},
    activityId: -1,
    lastActive: false,
    activityState: {},
    list: []
  },
  getters: {
    receiverTop: function receiverTop(state) {
      if (state.rankingList.hasOwnProperty("receiveGifts") && state.rankingList["receiveGifts"].length >= 3) {
        return [state.rankingList["receiveGifts"][0], state.rankingList["receiveGifts"][1], state.rankingList["receiveGifts"][2]];
      } else {
        return undefined;
      }
    },
    sendTop: function sendTop(state) {
      if (state.rankingList.hasOwnProperty("sendGifts") && state.rankingList["sendGifts"].length >= 3) {
        return [state.rankingList["sendGifts"][0], state.rankingList["sendGifts"][1], state.rankingList["sendGifts"][2]];
      } else {
        return undefined;
      }
    },
    receiverData: function receiverData(state) {
      if (state.rankingList.hasOwnProperty("receiveGifts")) {
        var others = state.rankingList["receiveGifts"];
        return others.slice(3);
      } else {
        return undefined;
      }
    },
    sendData: function sendData(state) {
      if (state.rankingList.hasOwnProperty("sendGifts")) {
        var others = state.rankingList["sendGifts"];
        return others.slice(3);
      } else {
        return undefined;
      }
    },
    mySelf: function mySelf(state) {
      if (state.rankingList.hasOwnProperty("profile")) {
        console.log("myprofile" + state.rankingList["profile"]);
        return state.rankingList["profile"];
      } else {
        console.log("no profile");
        return undefined;
      }
    },
    // activity:status 0：活动统计期（开启）; 1:活动结算; 2: 已下架
    activity: function activity(state) {
      if (state.rankingList.hasOwnProperty("activity")) {
        return state.rankingList['activity'];
      } else {
        return undefined;
      }
    }
  },
  actions: {
    ACTIVITYLIST: function ACTIVITYLIST(context, options) {
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/get_actitiyrank');
      var activityId = context.state.activityId;
      var listData = context.state.activityState;
      return _vue["default"].axios.post(api, _qs["default"].stringify(options)).then(function (response) {
        // console.log("新活动状态", response.data)
        // context.commit("list", {result: response.data})
        // return response.data;
        return _data.activityrank;
      })["catch"](function (reason) {});
    },
    ACTIVITYSTATE: function ACTIVITYSTATE(context, options) {
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/get_actitiyinfo');
      var activityId = context.state.activityId;
      return _vue["default"].axios.post(api, _qs["default"].stringify({
        jid: currentJid,
        pkg_name: pkgname,
        limit: '100',
        is_old_actitiy: options
      })).then(function (response) {
        // context.commit("loadState", {result: response.data})
        context.commit("loadState", {
          result: _data.activityInfo
        });
        return response.data;
      })["catch"](function (reason) {});
    },
    FETCH_USER_GIFT: function FETCH_USER_GIFT(context, options) {
      console.log('request user gift options11111 : ', options);
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/user_gift_rate');
      var timestamp = new Date().valueOf();
      var activityId = context.state.activityId;
      return _vue["default"].axios.get(api, {
        params: {
          "jid": currentJid,
          'activity_id': activityId,
          '_t': timestamp
        }
      }).then(function (response) {
        console.log("user gift response", response.data);
        context.commit("loadUserGiftRate", {
          result: response.data
        });
      })["catch"](function (reason) {
        console.log("user gift error :", reason);
        var HOST = process.env.HOST;
        var data = {};

        if (HOST === 'dev' || HOST === 'prod') {
          data = (0, _ApiHelper.buildUserGiftTestData)();
        }

        context.commit("loadUserGiftRate", {
          result: data
        });
      });
    },
    FETCH_USER_LUCK_DRAW: function FETCH_USER_LUCK_DRAW(context, options) {
      console.log('request user luck draw options : ', options);
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/user_get_gift');
      var timestamp = new Date().valueOf();
      var activityId = context.state.activityId;
      return _vue["default"].axios.get(api, {
        params: {
          "jid": currentJid,
          'activity_id': activityId,
          '_t': timestamp
        }
      }).then(function (response) {
        console.log("user luck draw  response", response.data);
        return response.data;
      })["catch"](function (reason) {
        console.log("user luck draw error :", reason);
        var HOST = process.env.HOST;
        var data = {};

        if (HOST === 'dev' || HOST === 'prod') {
          data = (0, _ApiHelper.buildUserLuckDrawTestData)();
        }

        return data;
      });
    },
    FETCH_ANCHOR_GIFT: function FETCH_ANCHOR_GIFT(context, options) {
      console.log('request anchor gift options : ', options);
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/anchor_gift_rate');
      var timestamp = new Date().valueOf();
      var activityId = context.state.activityId;
      return _vue["default"].axios.get(api, {
        params: {
          "jid": currentJid,
          'activity_id': activityId,
          '_t': timestamp
        }
      }).then(function (response) {
        console.log("anchor gift response", response.data);
        var data = response.data;
        context.commit("loadanchorGiftRate", {
          result: data
        });
        return data;
      })["catch"](function (reason) {
        console.log("user gift error :", reason);
        var HOST = process.env.HOST;
        var data = {};

        if (HOST === 'dev' || HOST === 'prod') {
          data = (0, _ApiHelper.buildAnchorGiftTestData)();
        }

        context.commit("loadanchorGiftRate", {
          result: data
        });
        return data;
      });
    },
    FETCH_ANCHOR_LUCK_DRAW: function FETCH_ANCHOR_LUCK_DRAW(context, options) {
      console.log('request anchor luck draw options : ', options);
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/anchor_get_gift');
      var timestamp = new Date().valueOf();
      var giftId = options.giftId;
      var activityId = context.state.activityId;
      return _vue["default"].axios.get(api, {
        params: {
          "jid": currentJid,
          'activity_id': activityId,
          '_t': timestamp,
          'gift_id': giftId
        }
      }).then(function (response) {
        console.log("anchor luck draw  response", response.data);
        return response.data;
      })["catch"](function (reason) {
        console.log("anchor luck draw error :", reason);
        var HOST = process.env.HOST;
        var data = {};

        if (HOST === 'dev' || HOST === 'prod') {
          data = (0, _ApiHelper.buildAnchorLuckDrawTestData)();
        }

        return data;
      });
    },
    FETCH_HAS_REWARD: function FETCH_HAS_REWARD(context, options) {
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/has_reward');
      var activity = parseInt(localStorage.getItem('activity_id'));
      return _vue["default"].axios.post(api, _qs["default"].stringify({
        "jid": currentJid,
        "activity_id": activity,
        "pkg_name": pkgname
      })).then(function (response) {
        var data = {};

        if (response.data == undefined || response.data == "") {
          data = {
            status: 0
          };
        } else {
          data.status = response.data.status;
          data.giftUrl = response.data.gift_url;
          data.userType = response.data.user_type;
          data.giftId = response.data.gift_id;
          data.giftNum = response.data.gift_num;
          data.jid = response.data.jid;
          data.rank = response.data.rank;
          data.rewardNum = response.data.reward_num;
          data.rewardType = response.data.reward_type;
          data.inviteTimes = response.data.invite_times;
          data.inviteDays = response.data.invite_days;
          data.activityId = response.data.activity_id;
        }

        context.commit("loadHasRewardResult", {
          result: data
        });
        localStorage.setItem('giftStatus', response.data.status);
        return data;
      })["catch"](function (reason) {
        console.log("has reward error :", reason);
        context.commit("loadHasRewardResult", {
          result: {
            status: 0
          }
        });
      });
    },
    FETCH_REWARD: function FETCH_REWARD(context, options) {
      console.log('request reward options1 : ', options);
      console.log("jid:" + window.jid + " lang:" + window.lang + " plat:" + plat);
      console.log('kenan555');
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/get_reward');
      console.log('kenan6');
      var activityId = localStorage.getItem('activity_id');
      console.log(activityId, 'kenan6');
      return _vue["default"].axios.post(api, _qs["default"].stringify({
        "jid": currentJid,
        "activity_id": activityId,
        "pkg_name": pkgname
      })).then(function (response) {
        console.log("reward response", response.data);

        if (response.data == undefined || response.data == "") {
          return false;
        }

        return response.data.status == 1;
      })["catch"](function (reason) {
        console.log("reward error :", reason);
        return false;
      });
    },
    FETCH_RANKING_LIST: function FETCH_RANKING_LIST(context, options) {
      //发布的时候换成服务端的域名
      var currentJid = (0, _ApiHelper.getCurrentJid)();
      var api = (0, _ApiHelper.requestApiUrl)('/ranking_activity/rank');
      var list = {};

      if (window.localStorage) {
        var localRankingList = window.localStorage.getItem("rankingList");

        if (localRankingList != null) {
          list = JSON.parse(localRankingList);
        }
      }

      return _vue["default"].axios.post(api, _qs["default"].stringify({
        "jid": currentJid,
        "pkg_name": pkgname
      })).then(function (response) {
        if (response.data != null && window.localStorage) {
          var status = response.data["activity"]["status"];
          var gift_id = response.data["activity"]["gift_id"];
          localStorage.setItem('activity_id', response.data["activity"]["activity_id"]);
          context.commit("loadActivityId", {
            result: response.data["activity"]["activity_id"]
          }); // 公布结果期间

          window.localStorage.setItem("rankStatus", status);
          window.localStorage.setItem("gift_id", gift_id);

          if (status == 1) {
            // 本地缓存结果
            window.localStorage.setItem("rankingList", JSON.stringify(response.data)); // 活动期间
          } else if (status == 0) {// 下架期间
          } else if (status == 2) {
            // loadError()
            // 上一次显示结果
            if (list.hasOwnProperty("activity") && list["activity"]["status"] == 1) {
              console.log("show last:", list);
              context.commit("loadRankingList", {
                rankingList: list
              });
              return;
            }
          }
        }

        context.commit("loadRankingList", {
          rankingList: response.data
        });
      })["catch"](function (reason) {
        console.log("reason:", reason); // loadError()
        // 请求异常，显示公布结果期间内容

        if (list.hasOwnProperty("activity") && list["activity"]["status"] == 1) {
          console.log("show last:", list);
          context.commit("loadRankingList", {
            rankingList: list
          });
          return;
        }
      });
    }
  },
  mutations: {
    setLastActive: function setLastActive(state, data) {
      state.lastActive = data;
    },
    loadRankingList: function loadRankingList(state, payload) {
      state.rankingList = payload.rankingList;
    },
    loadHasRewardResult: function loadHasRewardResult(state, data) {
      state.hasRewardResult = data.result;
    },
    loadUserGiftRate: function loadUserGiftRate(state, data) {
      console.log('user gift data ', data.result);
      state.userGiftRate = data.result;
    },
    loadanchorGiftRate: function loadanchorGiftRate(state, data) {
      console.log('anchor gift data ', data.result);
      state.anchorGiftRate = data.result;
    },
    loadActivityId: function loadActivityId(state, data) {
      state.activityId = data.result;
    },
    loadState: function loadState(state, data) {
      state.activityState = data.result;
    },
    list: function list(state, data) {
      state.list = data.result;
    }
  }
});
var _default = store;
exports["default"] = _default;