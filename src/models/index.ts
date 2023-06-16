const {Client} = require('pg')
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'chatroom',
    password: 'tsk999',
    port: 5432,
})

client.connect();
 
export default client;