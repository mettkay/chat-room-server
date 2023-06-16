import client from "../models";
import Record from "../models/core/record";

const getRecord = page =>{
  let sql = "select r.id as rid,* from chat_record r inner join t_user u on r.user_id = u.id order by create_time desc limit $1 offset $2"
  return new Promise((resolve,reject)=>{ 
    client.query(sql,[page.pageSize,page.pageIndex*page.pageSize],(err,results)=>{
      if (err) return reject(err)

      resolve(results.rows)
    })
  })
}


const addRecord = (record:Record)=>{
  let sql = "INSERT INTO public.chat_record (user_id, info, create_time) VALUES ( $1, $2, now()) returning id"
  return new Promise((resolve,reject)=>{
    client.query(sql,[record.uid,record.info],(err,results)=>{
      if(err) return reject(err)

      resolve(results.rows[0].id)
    })
  })
}



export {
  getRecord,
  addRecord
}