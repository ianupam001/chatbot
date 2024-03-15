const { log } = require('console');
const { Socket } = require('dgram');
const express=require('express');
const app=express();
const http=require('http').Server(app);
const io =require('socket.io')(http);
const port=process.env.PORT || 4001;

app.use(express.static('src/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'public/index.html');
});

io.on('connection',(socket)=>{
    console.log('A user connected');
    socket.on('disconnnect',()=>{
        console.log('A user disconnected');
    })

    socket.on('message',(message)=>{
        const response=`ChatBot: ${message}`;
        socket.emit('botMessage',response);
    })
})


http.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})