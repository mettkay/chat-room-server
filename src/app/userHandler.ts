import client from "../models";
import User from "../models/core/User";

export const login = (res,uuid:string)=>{
  const sql = 'select * from t_user where uuid = $1'

  return new Promise((resolve,reject)=>{ 
    client.query(sql,[uuid],(err,results)=>{
      if (err) return res.cc(err)
      
      const user = results.rows[0]

      resolve(user)
    })
  })
}

export const reguser = (res,user:User)=>{
  const sql = 'INSERT INTO t_user ( nick, avatar, uuid ) values ($1,$2,$3 ) RETURNING id'

  return new Promise((resolve,reject)=>{ 
    client.query(sql,[user.nick,user.avatar,user.uuid],(err,results)=>{
      if (err) return res.cc(err)
      
      user.id = results.rows[0].id

      resolve(user)
    })
  })
}

export const updateUser = (user:User)=>{
  const sql = "UPDATE t_user SET nick=$1, avatar=$2 WHERE id = $3"

  return new Promise((resolve,reject)=>{
    client.query(sql,[user.nick,user.avatar,user.id],(err,results)=>{
      if(err) return reject(err)

      resolve('')
    })
  })
}
