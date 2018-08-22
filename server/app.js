var Koa = require('koa');
var Router = require('koa-router');
var debug = require('debug')('api-demo');
var cors = require('koa-cors');
var app = new Koa();

app.use(cors());

var router = new Router();

router.get('/ranking-list', (ctx, next) => {
    let ret = [];
    for(var i = 0; i < 30; i++){
        ret.push({
            id: i,
            jid: "test@lbesec.com",
            name: "test",
            avatar: "https://placeimg.com/40/40/people/5",
            value: 100
        });
    }
    ctx.body = ret;
});

app
  .use(router.routes())
  .use(router.allowedMethods());


// 启动程序，监听端口
app.listen(8445, () => debug(`listening on port 8445}`))
