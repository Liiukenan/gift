var Koa = require('koa');
var Router = require('koa-router');
var debug = require('debug')('api-demo');
var cors = require('koa-cors');
var app = new Koa();

app.use(cors());

var router = new Router();

// router.get('/ranking-list', (ctx, next) => {
//     let ret = [];
//     for(var i = 0; i < 30; i++){
//         ret.push({
//             id: i,
//             jid: "test@lbesec.com",
//             name: "test",
//             avatar: "https://placeimg.com/40/40/people/5",
//             value: 100
//         });
//     }
//     ctx.body = ret;
// });

router.post('/ranking-list', (ctx, next) => {
  // {"jid":"xxxx","role":"user"}
  console.log(JSON.stringify(ctx.request));
  console.log(JSON.stringify(ctx.request.body));

  var responseBody = {}
  var profile = {}
  profile["jid"] = "jid";
  profile["nickname"] = "tom";
  profile["avatarUrl"] = "http://54.222.148.146:8000/s/files/fe/09/fe09617e2565486a5f7f5a0249be3ee1b9fdfdc6/ao8ByMmmv78OT0AiBC3xIHLB5OZIEQQgakA5ApDb/JPEG_20180528_114252_847950680.jpg";
  profile["gifts"] = 100;
  profile["distance"] = 0;
  profile["ranking"] = "100+";

  let receiveObj = [];
  for (var i = 0; i < 100; i++) {
    receiveObj.push({
      jid: "test@lbesec.com",
      nickname: "test" + i,
      avatarUrl: "https://placeimg.com/40/40/people/5",
      gifts: 100,
      isVip:false,
      ranking:1+i
    });
  }

  let sendObj = [];
  for (var i = 0; i < 100; i++) {
    sendObj.push({
      jid: "test@lbesec.com",
      nickname: "test" + i,
      avatarUrl: "https://placeimg.com/40/40/people/5",
      gifts: 100,
      isVip:false,
      ranking:1+i
    });
  }


  responseBody["profile"] = profile;
  responseBody["receiveGifts"] = receiveObj;
  responseBody["sendGifts"] = sendObj;

  ctx.response.body = responseBody;
});

app
  .use(router.routes())
  .use(router.allowedMethods());


// 启动程序，监听端口
app.listen(8445, () => debug(`listening on port 8445}`))
