const express = require('express')
const recordHandler = require('../app/recordHandler')

const router = express.Router()



router.get('/getRecord', async (req,res)=>{
  let rows
  try {
    rows = await recordHandler.getRecord(req.query)
  } catch (error) {
     res.cc(error)
     return
  }

  let data:Array<object> = []

  rows.forEach(e => {
    let obj = {}
    obj['id'] = e.rid
    obj['uid'] = e.user_id
    obj['avatar'] = e.avatar
    obj['nick'] = e.nick
    obj['info'] = e.info
    obj['createTime'] = new Date(e.create_time).getTime()
    data.push(obj)
  });

  data.reverse()

  res.send({
    data: data,
    message: "success",
    status: 0
  })
})


router.post('/addRecord', async (req,res)=>{
  let id
  try {
    id = await recordHandler.addRecord(req.body)
  } catch (error) {
    res.cc(error)
  } 
  
  res.send({
    data: {id},
    message: "success",
    status: 0
  })

})

module.exports = router

export {}