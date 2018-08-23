// 关闭当前页面
export function closePager() {
  console.log("closePager");
  if (plat == "android") {
    jsInteractive.closePager();
  } else if (plat == "ios") {
    var message = {methodName: 'closePager'};
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }

}

// 进入活动详情页面
export function enterEventDetails(url) {
  console.log("enterEventDetails:" + url);
  if (plat == "android"){
    jsInteractive.enterEventDetails(url)
  } else if (plat == "ios"){
    var message = {methodName: 'enterEventDetails', jsonParams: JSON.stringify({"url": url})};
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }

}

// 跳转到个人详情页面
export function jumpPersonDetail(jid) {
  console.log("jumpPersonDetail:" + jid);
  if (plat == "android") {
    jsInteractive.jumpPersonDetail(jid)
  } else if (plat == "ios") {
    var message = {methodName: 'jumpPersonDetail', jsonParams: JSON.stringify({"jid": jid})};
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }
}

// 跳转到主页
export function jumpMain() {
  console.log("jumpMain");
  if (plat == "android") {
    jsInteractive.jumpMain()
  } else if (plat == "ios") {
    var message = {methodName: 'jumpMain'};
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }

}

// 跳转Online User
export function jumpOnlineUser() {
  console.log("jumpOnlineUser");
  if (plat == "android") {
    jsInteractive.jumpOnlineUser()
  } else if (plat == "ios") {
    var message = {methodName: 'jumpOnlineUser'};
    window.webkit.messageHandlers.ActivityGiftCenter.postMessage(message);
  }

}
