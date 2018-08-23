// 关闭当前页面
export function closePager() {
  console.log("closePager");
  jsInteractive.closePager()
}

// 进入活动详情页面
export function enterEventDetails(url) {
  console.log("enterEventDetails:" + url);
  jsInteractive.enterEventDetails(url)
}

// 跳转到个人详情页面
export function jumpPersonDetail(jid) {
  console.log("jumpPersonDetail:" + jid);
  jsInteractive.jumpPersonDetail(jid)
}

// 跳转到主页
export function jumpMain() {
  console.log("jumpMain");
  jsInteractive.jumpMain()
}

// 跳转Online User
export function jumpOnlineUser() {
  console.log("jumpOnlineUser");
  jsInteractive.jumpOnlineUser()
}
