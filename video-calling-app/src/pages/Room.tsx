import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext'
import type Peer from 'peerjs';

const Room = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const SocketContext = useSocket();
    const socket = SocketContext?.socket;
    const user: Peer|null=SocketContext?.user as Peer|null;
    const navigate = useNavigate();

    const [participants, setParticipants] = React.useState<string[]>([]);

    // Handle join/create logic and leave-room on unload
    let isCreator = false;
    useEffect(() => {
        if (!roomId) {
            navigate('/');
            return;
        }

    
        if (socket && roomId) {
            if (isCreator) {
                socket.emit('room-created', { roomId,userId:user?.id });
                console.log('Room created:', roomId, 'by peer ID:', socket.id);
            } else {
                socket.emit('join-room', { roomId,userId:user?.id });
            }

            // Emit leave-room on tab close/refresh
            const handleBeforeUnload = () => {
                socket.emit('leave-room', { roomId,userId :user?.id });
            };
            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [socket, roomId, location.state, navigate]);

    // Dedicated effect for participants updates
    useEffect(() => {
        if (!socket) return;

        const handleJoinedRoom = (data: { roomId: string, socketId: string, participants: string[] }) => {
            setParticipants(data.participants);
            console.log('Participants in room:', JSON.stringify(data.participants)); // <-- log the correct value
            console.log('Joined room:', data.roomId, 'with peer ID:', data.socketId);
            
        };

        socket.on('joined-room', handleJoinedRoom);

        return () => {
            socket.off('joined-room', handleJoinedRoom);
        };
    }, [socket]);

    // Log participants whenever they change
    useEffect(() => {
        console.log('Participants state updated:', participants);
    }, [participants]);

    return (
        <div>Room</div>
        
    )
}

export default Room