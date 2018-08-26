const Koa = require('koa');
const Router = require('koa-router');
const debug = require('debug')('api-demo');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const app = new Koa();

app.use(cors());

const router = new Router();


router.post('/ranking-list',koaBody(),(ctx, next) => {
  // {"jid":"xxxx"}
  console.log(JSON.stringify(ctx.request));
  console.log(JSON.stringify(ctx.request.body));
  var jid = ctx.request.body["jid"];
  var responseBody = {}
  var profile = {}
  var activity = {}
  profile["jid"] = jid;
  profile["nickname"] = "tom";
  profile["avatarUrl"] = "http://54.222.148.146:8000/s/files/fe/09/fe09617e2565486a5f7f5a0249be3ee1b9fdfdc6/ao8ByMmmv78OT0AiBC3xIHLB5OZIEQQgakA5ApDb/JPEG_20180528_114252_847950680.jpg";
  profile["gifts"] = 100;
  profile["distance"] = 0;
  profile["ranking"] = "99+";
  profile["role"] = "user";

  let receiveObj = [];
  for (var i = 0; i < 100; i++) {
    receiveObj.push({
      jid: "test@lbesec.com",
      nickname: "test" + i,
      avatarUrl: "https://placeimg.com/40/40/people/5",
      gifts: 100,
      isVip: false,
      ranking: 1 + i
    });
  }

  let sendObj = [];
  for (var i = 0; i < 100; i++) {
    sendObj.push({
      jid: "test@lbesec.com",
      nickname: "test" + i,
      avatarUrl: "https://placeimg.com/40/40/people/5",
      gifts: 100,
      isVip: false,
      ranking: 1 + i
    });
  }

  activity['status'] = 1;
  activity['time'] = "2018.08.26-2018.09.26"


  responseBody["profile"] = profile;
  responseBody["receiveGifts"] = receiveObj;
  responseBody["sendGifts"] = sendObj;
  responseBody["activity"] = activity;

  ctx.response.body = responseBody;
});

app
  .use(router.routes())
  .use(router.allowedMethods());


// 启动程序，监听端口
app.listen(8445, () => debug(`listening on port 8445}`))
