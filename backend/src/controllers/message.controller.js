import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketid, io } from "../lib/socket.js";


export const getUsersForSidebar  = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ Error: "Internal server error"});
        
        
    }
}


export const getMessages = async (req, res) =>{
    try { 

        {/** 
            isko aise bhi likh sakte hain
            const userToChatId = req.params._id;
        */}
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            //learn this
            $or: [
                //Basically we say find all the messages where sender is me and receiver is other user
                { senderId: myId, receiverId: userToChatId },
                //Basically we say find all the messages where sender is other user and I am the receiver
                { senderId:userToChatId, receiverId: myId }
            ],  
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
        
    }
}


/** When we want to send a message this message could be either a text or it could be an image
 * so let's keep in mind while building it
 */

export const sendMessage = async (req, res) =>{
    try {
        //grab the text and image from request.body and grab the receiver id
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id; //this is me

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        //When we send the message we first save the message to the database
        await newMessage.save();

        //todo: realtime functionality goes here => socket.io
        //Then we check if the receiver is online or not then we send this message to that user specifically
        const receiverSocketId = getReceiverSocketid(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMesage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
        
    }
}

