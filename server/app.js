var Koa = require('koa');
var Router = require('koa-router');
var debug = require('debug')('api-demo')
var cors = require('koa-cors');
var app = new Koa();

app.use(cors());

var router = new Router();

router.get('/ranking-list', (ctx, next) => {
    ctx.body = [
        {
          id: 0,
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        },
        {
          id: 1,
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        }
      ]
});

app
  .use(router.routes())
  .use(router.allowedMethods());


// 启动程序，监听端口
app.listen(8445, () => debug(`listening on port 8445}`))