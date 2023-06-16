import User from "./User"

class Record {
  id:number
  uid:number
  info:string
  createTime:number

  constructor(){
    this.id = 0,
    this.uid = 0,
    this.info = '',
    this.createTime = 0
  }

}

export default Record