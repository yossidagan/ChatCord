const path = require('path')
const express = require('express')
const http = require('http')

const app = express()
const socketIo = require('socket.io')
const server = http.createServer(app)
const formatMessage = require('./public/utils/messages')

const adminName = 'DaganChat Admin'

const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    console.log('New Web Socket Connection...')

    socket.emit('message', formatMessage(adminName, 'Welcome to ChatCord')) // To the current user 

    socket.broadcast.emit('message', formatMessage(adminName, 'A user has joined the chat')) // To everyone except the user

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(adminName, 'A user has left the chat')) // To everyone including the user 
    })
    
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg))
    })
})

const PORT = 3000

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

