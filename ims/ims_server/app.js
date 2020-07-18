const Koa = require("koa");
const cors = require('koa2-cors');
const Router = require('koa-router');
const koaBody = require('koa-body');

var usersRouter = require('./routes/user');
var warehouseRouter = require('./routes/warehouse');
var orderRouter = require('./routes/order');
var goodsRouter = require('./routes/goods');
var driverRouter = require('./routes/driver');
var buserRouter = require('./routes/buser');
var taskRouter = require('./routes/task');


//初始化Koa
const app = new Koa();


//初始化路由
const router = new Router({
    prefix: "/ims",
})


//跨域配置
app.use(cors({
    
    origin: function (ctx) {
        //允许所有url访问
        return [ctx.request.header.origin];
    },
    maxAge: 5,  //最大访问数量
    credentials: true  //允许携带cookie跨域
}));


//格式化请求参数
app.use(koaBody());


//配置控制器相应路由
router.use('/user', usersRouter.routes());
router.use('/warehouse',warehouseRouter.routes());
router.use('/order',orderRouter.routes());
router.use('/goodinfo', goodsRouter.routes());
router.use('/driver', driverRouter.routes());//商家
router.use('/buser', buserRouter.routes());
router.use('/task', taskRouter.routes());

// router.use('/warehouse', warehouseRouter.routes());

//使用router
app.use(router.routes());



//创建监听
app.listen(3000);

console.log("server running : http://localhost:3000");


