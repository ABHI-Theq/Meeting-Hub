import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser'
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { DBConnect } from './DBConfig/DataBaseConnetion';
import Authroute from "./routes/Authroute"
import { protectedRoute } from './Middleware/ProtectRoute';
import { Request, Response } from 'express';

DBConnect()
const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/api/auth',Authroute)

const server=createServer(app);

const userSocketMap: Map<string,string[]> = new Map<string, string[]>();
// This map will hold the roomId as key and an array of peerIds as value


app.get("/api/room/:roomId", protectedRoute, async (req: Request, res: Response) : Promise<void>=> {
    const roomId = req.params.roomId;
    const peerIds = userSocketMap.get(roomId);
    if (!peerIds) {
         res.status(200).send({ error: "Room does not found" });
         return;
    }
     res.status(200).send({ message: "exists" });
     return;
});

const io=new Server(server,{
    cors:{
        methods:["GET","POST"],
                origin:"*",
    }
})

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // handle room creation
    socket.on('room-created', ({roomId, userId}) => {
        socket.join(roomId);
        console.log('Room created:', roomId);

        // Remove old userId if it exists in the room
        if (userSocketMap.has(roomId)) {
            const users = userSocketMap.get(roomId);
            if (users) {
                userSocketMap.set(roomId, users.filter(id => id !== userId));
            }
        } else {
            userSocketMap.set(roomId, []);
        }
        userSocketMap.get(roomId)?.push(userId);

        io.to(roomId).emit('joined-room', { roomId, userId, participants: userSocketMap.get(roomId) || [] });
    });

    socket.on('join-room', ({roomId, userId}) => {
        socket.join(roomId);
        console.log('User joined room:', roomId);

        // Remove old userId if it exists in the room
        if (userSocketMap.has(roomId)) {
            const users = userSocketMap.get(roomId);
            if (users) {
                userSocketMap.set(roomId, users.filter(id => id !== userId));
            }
        } else {
            userSocketMap.set(roomId, []);
        }
        userSocketMap.get(roomId)?.push(userId);

        io.to(roomId).emit('joined-room', { roomId, userId, participants: userSocketMap.get(roomId) || [] });
    });

    socket.on('leave-room', ({roomId, userId}) => {
        socket.leave(roomId);
        console.log('User left room:', roomId);
        if(userSocketMap.has(roomId)) {
            const users = userSocketMap.get(roomId);
            if(users) {
                userSocketMap.set(roomId, users.filter(id => id !== userId));
            }
        }
        if(userSocketMap.get(roomId)?.length === 0) {
            userSocketMap.delete(roomId);
            console.log('Room deleted:', roomId);
        }
        io.to(roomId).emit('user-left', { roomId, userId });
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server is up and running on port ${process.env.PORT}`);
});

// No changes needed for correct participant management with PeerJS
