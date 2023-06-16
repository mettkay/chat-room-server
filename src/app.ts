const express = require('express')
const app = express()
const socketIO = require('socket.io')
const userRouter = require('./router/user.ts')
const recordRouter = require('./router/record.ts')
const socketProxy = require('./router/socketProxy')

const cors = require('cors')

const whitelist = ['*']
const corsOptions = {
  origin: function (origin, callback) {
    if (true) {
      callback(null, true)
    }
  },
  credentials: true
}
app.use(cors(corsOptions));


var bodyParser = require('body-parser');
app.use(bodyParser());

const http = require('http')
const server = http.createServer(app)

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

socketProxy(io)


// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
     res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})



app.use('/api', userRouter,recordRouter)

server.listen(3007,()=>{
  console.log('api server running at http://127.0.0.1:3007/api')
})

