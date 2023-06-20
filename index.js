const express = module.require('express')
const socket = module.require('socket.io')
const path = module.require('path')
const dotenv = module.require('dotenv')

// create app from express
const app = express()


// configuring dotenv
dotenv.config()
app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT
const server = app.listen(PORT, ()=>{
     console.log("server listening on PORT " + PORT)
})

// invoke socket
const io = socket(server)

io.on('connection', (user)=>{
     console.log(`user with the id ${user.id} just connected to the server.`)


     user.on('chat', (data)=>{
         user.broadcast.emit('chat-message', data)
     })
})



// deployment
const __dirname1 = path.resolve()
if(process.env.NODE_ENV === 'production'){

      app.use(express.static(path.join(__dirname1, 'public')))
      app.get('*', (req, res)=>{
             res.sendFile(path.resolve(__dirname1, 'public', 'index.html'))
      })
}else{
       app.get("/", (req, res)=>{
             res.send("still under development ")
       })
}


