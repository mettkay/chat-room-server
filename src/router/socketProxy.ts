const recordHandler = require('../app/recordHandler')

const proxy = io => {
  io.on('connection', client => {
    console.log('user connected')

    client.on('login', () => {
      io.sockets.emit('broadcast_online', {
        online: io.eio.clientsCount
      })
    });

    client.on('send_msg', async data => {
      data.id = await recordHandler.addRecord(data)

      io.sockets.emit('broadcast_msg', {
        msg: data,
      })
    })

    client.on('disconnect', () => {
      console.log('user disconnected');
      io.sockets.emit('broadcast_online', {
        online: io.eio.clientsCount
      })
    });

    
  })
}

module.exports = proxy