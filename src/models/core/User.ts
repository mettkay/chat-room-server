

class User{
  id: number
  uuid:string
  nick: string
  avatar:string
  constructor(id:number,uuid:string,nick:string,avatar:string){
    this.id = id
    this.uuid = uuid
    this.nick = nick
    this.avatar = avatar
  }
}

export default User