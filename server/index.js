import express from 'express'
import {createServer} from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const port = 3000 

const app = express()
const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
})

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true,
}))


app.get("/",(req,res)=>{
    res.send("Hello WoRDL")
})

io.on("connection",(socket)=>{
    console.log("User Connected")
    console.log("id:",socket.id)
    socket.emit("welcome",`Welcome boy, ${socket.id}`)
    socket.broadcast.emit("welcome",`${socket.id} joined the server`)
})

server.listen(port,()=>{
    console.log("server is on 3000")
})