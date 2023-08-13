const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server,{cors:{origin:'*'}})


io.on('connection',(socket)=>{
    console.log("User conectado:", socket.id);
    socket.on('disconnect',()=>{
        console.log("Un usuario se ha deconectado");
    })
    socket.on('chat',(msg)=>{
        io.emit('chat',msg)
    })
})

app.get('/',(req,res)=>{
    res.send('hola mundo')
})

server.listen(3000,()=>{
    console.log("listen on port 3000");
})