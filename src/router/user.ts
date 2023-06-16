const express = require('express')
const userHandler = require('../app/userHandler')


// 创建路由对象
const router = express.Router()

// 注册新用户
router.post('/reguser', async (req, res) => {
  const data = await userHandler.reguser(res,req.body)

  res.send({
    data,
    status:0,
    message: "success",
  })
})

// 登录
router.post('/login', async (req, res) => {

  const uuid = req.body.uuid

  const data = await userHandler.login(res,uuid)

  res.send({
    data,
    status:0,
    message: "success",
  })

})

router.post('/updateUser',async (req,res)=>{
  try {
    await userHandler.updateUser(req.body)
  } catch (error) {
    res.cc(error)
  }

  res.send({
    status:0,
    message: "success",
  })
})

module.exports = router
export {};