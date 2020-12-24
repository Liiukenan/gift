"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closePager = closePager;
exports.enterEventDetails = enterEventDetails;
exports.jumpPersonDetail = jumpPersonDetail;
exports.jumpMessage = jumpMessage;
exports.jumpMain = jumpMain;
exports.jumpOnlineUser = jumpOnlineUser;
exports.logEvent = logEvent;
exports.loadError = loadError;
exports.getQueryVariable = getQueryVariable;

// 关闭当前页面
function closePager() {
  console.log("closePager");

  if (plat == "android") {
    jsInteractive.closePager();
  } else if (plat == "ios") {
    var message = {
      methodName: 'closePager'
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
} // 进入活动详情页面


function enterEventDetails(url) {
  console.log("enterEventDetails:" + url);

  if (plat == "android") {
    jsInteractive.enterEventDetails(url);
  } else if (plat == "ios") {
    var message = {
      methodName: 'enterEventDetails',
      jsonParams: JSON.stringify({
        "url": url
      })
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
} // 跳转到个人详情页面


function jumpPersonDetail(jid) {
  logEvent("event_activity_page_profile_click", "");

  if (plat == "android") {
    jsInteractive.jumpPersonDetail(jid);
  } else if (plat == "ios") {
    var message = {
      methodName: 'jumpPersonDetail',
      jsonParams: JSON.stringify({
        "jid": jid
      })
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
} // 跳转到聊天界面


function jumpMessage(jid) {
  logEvent("event_activity_page_chatroom_click", "");

  if (plat == "android") {
    jsInteractive.jumpMessage(jid);
  } else if (plat == "ios") {
    var message = {
      methodName: 'jumpMessage',
      jsonParams: JSON.stringify({
        "jid": jid
      })
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
} // 跳转到主页


function jumpMain() {
  console.log("jumpMain");

  if (plat == "android") {
    jsInteractive.jumpMain();
  } else if (plat == "ios") {
    var message = {
      methodName: 'jumpMain'
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
} // 跳转Online User


function jumpOnlineUser() {
  console.log("jumpOnlineUser");

  if (plat == "android") {
    jsInteractive.jumpOnlineUser();
  } else if (plat == "ios") {
    var message = {
      methodName: 'jumpOnlineUser'
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
} // 打点接口
// example:     key:value;key:value
// 分号分割键值对，冒号分割key value


function logEvent(event, map) {
  if (plat == "android") {
    jsInteractive.logEvent(event, map);
  } else if (plat == "ios") {
    var json_info = {};
    var strArray = map.split(";");

    for (var i = 0; i < strArray.length; i++) {
      var temp = strArray[i].split(":");
      json_info[temp[0]] = temp[1];
    }

    var message = {
      methodName: 'logEvent',
      'event': event,
      jsonParams: JSON.stringify(json_info)
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}
/**
 * 加载失败
 */


function loadError() {
  console.log("loadError");

  if (plat == "android") {
    jsInteractive.loadError();
  } else if (plat == "ios") {
    var message = {
      methodName: 'loadError'
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] == variable) {
      return pair[1];
    }
  }

  return '';
}