const path = require('path')
const express = require('express')
const http = require('http')

const app = express()
const socketIo = require('socket.io')
const server = http.createServer(app)

const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    console.log('New Web Socket Connection...')
})

const PORT = 3000

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

