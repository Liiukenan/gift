// 关闭当前页面
export function closePager() {
  console.log("closePager");

  if (plat == "android") {
    jsInteractive.closePager();
  } else if (plat == "ios") {
    var message = { methodName: "closePager" };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}
// 进入活动详情页面
export function enterEventDetails(url) {
  console.log("enterEventDetails:" + url);

  if (plat == "android") {
    jsInteractive.enterEventDetails(url);
  } else if (plat == "ios") {
    var message = {
      methodName: "enterEventDetails",
      jsonParams: JSON.stringify({ url: url })
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

// 跳转到个人详情页面
export function jumpPersonDetail(jid) {
  logEvent("event_activity_page_profile_click", "");
  if (plat == "android") {
    jsInteractive.jumpPersonDetail(jid);
  } else if (plat == "ios") {
    var message = {
      methodName: "jumpPersonDetail",
      jsonParams: JSON.stringify({ jid: jid })
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}
// 跳转到聊天界面
export function jumpMessage(jid) {
  logEvent("event_activity_page_chatroom_click", "");

  if (plat == "android") {
    jsInteractive.jumpMessage(jid);
  } else if (plat == "ios") {
    var message = {
      methodName: "jumpMessage",
      jsonParams: JSON.stringify({ jid: jid })
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

// 跳转到主页
export function jumpMain() {
  console.log("jumpMain");
  if (plat == "android") {
    jsInteractive.jumpMain();
  } else if (plat == "ios") {
    var message = { methodName: "jumpMain" };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

// 跳转Online User
export function jumpOnlineUser() {
  console.log("jumpOnlineUser");
  if (plat == "android") {
    jsInteractive.jumpOnlineUser();
  } else if (plat == "ios") {
    var message = { methodName: "jumpOnlineUser" };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

// 打点接口
// example:     key:value;key:value
// 分号分割键值对，冒号分割key value
export function logEvent(event, map) {
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
      methodName: "logEvent",
      event: event,
      jsonParams: JSON.stringify(json_info)
    };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

/**
 * 加载失败
 */
export function loadError() {
  console.log("loadError");
  if (plat == "android") {
    jsInteractive.loadError();
  } else if (plat == "ios") {
    var message = { methodName: "loadError" };
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  if(variable==="packageName"){
    return "default"
  }
  return "";
}

export function getIconName() {
  const packageName = getQueryVariable("packageName");
  const packageNameArr = {
    zakzak: [
      "com.hiyaa.videochat",
      "com.hiyaa.videochat",
      "com.live.videochat.india",
      "com.zakzak.lite.chat",
      "com.zakzak.live.chat"
    ],
    fachat: [
      "com.fachat.freechat",
      "com.fachat.freechat",
      "com.yochat.freechat"
    ],
    mumu: [
      "com.parau.videochat",
      "com.parau.pro.videochat",
      "com.mumu.videochat",
      "com.mumu.videochat.india"
    ],
    cherru: [
      "com.cherru.video.chat",
      "com.cherru.pro.video.chat",
      "com.cherru.video.live.chat"
    ],
    parame: ["com.parame.live.chat", "com.parame.chat"],
    zakulive: ["com.zaku.live.chat"],
    miki: ["com.miki.chat"],
    topu: ["com.topu.livechat"],
    videochat: ["com.videochat.livechat", "com.videochat.livchat"]
  };
  let newArr = Object.values(packageNameArr);
  let arr = JSON.parse('[' + JSON.stringify(newArr).replace(/\[|\]/g, '') + ']');
  if (arr.includes(packageName)) {
    for (const item in packageNameArr) {
      if (packageNameArr[item].includes(packageName)) {
        return item;
      }
    }
  } else {
    return "default";
  }
}
