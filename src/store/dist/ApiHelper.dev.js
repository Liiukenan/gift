"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestApiUrl = requestApiUrl;
exports.getCurrentJid = getCurrentJid;
exports.buildUserGiftTestData = buildUserGiftTestData;
exports.buildUserLuckDrawTestData = buildUserLuckDrawTestData;
exports.buildAnchorGiftTestData = buildAnchorGiftTestData;
exports.buildAnchorLuckDrawTestData = buildAnchorLuckDrawTestData;

function requestApiUrl(apiName) {
  // console.log("has reward jid:" + window.jid + " lang:" + window.lang + " plat:" + plat)
  var api = '/ranking_activity/has_reward';
  var HOST = process.env.HOST;

  if (HOST === 'dev' || HOST === 'prod') {
    api = 'https://www.fastmock.site/mock/348b3d6d2caee5a41791c6b57688ac48/hiyya' + apiName;
  }

  if (HOST === 'B0') {
    api = 'https://www.fastmock.site/mock/348b3d6d2caee5a41791c6b57688ac48/hiyya' + apiName;
  } else if (HOST === 'B1') {
    api = 'http://vshow-api-ra.1-1.io' + apiName;
  }

  return api;
}

function getCurrentJid() {
  var currentJid = window.jid; // var currentJid = "user_1040298@bj2.1-1.io";
  // var currentJid="anchor_1019281@bj2.1-1.io";
  // anchor_1021646@bj2.1-1.io
  // if (window.plat == "android" || window.plat == "ios"){
  //     currentJid = window.jid;
  // }

  return currentJid;
}

function buildUserGiftTestData() {
  var data = {};
  data.jid = "user_1022228@bj2.1-1.io";
  data.gift_rate_score = 30;
  data.gift_rate_require = 100;
  data.bonus = 0;
  return data;
}

function buildUserLuckDrawTestData() {
  var data = {};
  data.jid = "user_1021550@bj2.1-1.io";
  data.gift_name = 'gems';
  data.gift_type = 'gems';
  data.gift_num = 100;
  return data;
}

function buildAnchorGiftTestData() {
  var data = {};
  data.jid = "user_1021550@bj2.1-1.io";
  data.gifts = [];

  for (var index = 0; index < 4; index++) {
    var gift = {};
    gift.gift_id = index;
    gift.gift_name = 'test ' + index;
    gift.gift_rate_score = 80;
    gift.gift_rate_require = 100 * index;
    gift.could_get = 1;
    data.gifts[index] = gift;
  }

  return data;
}

function buildAnchorLuckDrawTestData() {
  var data = {};
  data.jid = "user_1021550@bj2.1-1.io";
  data.gift_id = 1;
  data.status = 1;
  return data;
}