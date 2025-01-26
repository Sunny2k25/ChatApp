import {Server} from "socket.io";
import http  from "http";
import express from "express";



/**
 * We import server from socket.io
 * as you see http not in our package.json because this is built in node 
 */


const app = express();
const server = http.createServer(app); //Server we have created


//We have to pass the server to the socket.io
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

//Helper Function
export function getReceiverSocketid(userId){
    return userSocketMap[userId];
}


//Used to store online user
const userSocketMap = {}; //{userId: socketId}


//we are listening for any incoming connections
io.on("connection", (socket) =>{
    //Handling online users state
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsrs", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user Disonnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsrs", Object.keys(userSocketMap));
        
    })
    
});

export {app,server,io};