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
          jid: "test@lbesec.com",
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        },
        {
          id: 1,
          jid: "test@lbesec.com",
          name: "test",
          avatar: "https://placeimg.com/40/40/people/5",
          value: 100
        },
        {
            id: 2,
            jid: "test@lbesec.com",
            name: "test",
            avatar: "https://placeimg.com/40/40/people/5",
            value: 100
        },
        {
            id: 3,
            jid: "test@lbesec.com",
            name: "test",
            avatar: "https://placeimg.com/40/40/people/5",
            value: 100
        },
        {
            id: 4,
            jid: "test@lbesec.com",
            name: "test",
            avatar: "https://placeimg.com/40/40/people/5",
            value: 100
        },
        {
            id: 5,
            jid: "test@lbesec.com",
            name: "test",
            avatar: "https://placeimg.com/40/40/people/5",
            value: 100
        },
        {
            id: 6,
            jid: "test@lbesec.com",
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