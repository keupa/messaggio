const app = require('express')()
const http = require('http')
const socket = require('socket.io')
const cors = require('cors')
const { Console } = require('console')

const PORT = process.env.PORT || 8080

let users = []

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin')
  next()
})

const server = http.createServer(app)

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

function addUser({id, username, room, typing}){
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const userExists = users.find((user) => user.room === room && user.name === username)
  if(userExists){
    return { error: 'Username is already taken, please pick another one'}
  }
  
  const user = { id, username, room, typing }
  users.push(user)

  return {user}
}

function removeUser(id){
  const index = users.findIndex((user) => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
}

const usersAtRoom = (room) => users.filter((user) => user.room === room);

io.on('connection', (socket) => {
  socket.on('join', ({ username, room }, callback) => {
    const { err, user } = addUser({ id: socket.id, username, room, typing: false})
    if(err) return callback(err)
    socket.broadcast.to(user.room).emit('message', { user: 'messaggio', text: `${user.username} has joined the room 🌿`})
    socket.join(user.room)
    io.to(user.room).emit('data', { room: user.room, users: usersAtRoom(user.room) });

    callback()
  }); 

  socket.on('sendMessage', (message, callback) => {
    const user = users.find(user => user.id === socket.id)
    io.to(user.room).emit('message', { user: user.username, text: message})
    
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if(user){
      socket.broadcast.to(user.room).emit('message', { user: 'messaggio', text: `${user.username} has left the room 🥀`})
      io.to(user.room).emit('data', { room: user.room, users: usersAtRoom(user.room)});
    }
  });
});

server.listen(PORT, err => {
  if (err) throw new Error(err)
  console.log(`Running @ port ${PORT}`)
})