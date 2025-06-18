import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext'
import Peer from 'peerjs'
import type { MediaConnection } from 'peerjs'
import { peerReducer } from '../Reducer/peerReducer'
import OtherVIdeoFeed from '../components/OtherVIdeoFeed'

const Room = () => {
    const { roomId } = useParams();
    const SocketContext = useSocket();
    const socket = SocketContext?.socket;
    const user: Peer | null = SocketContext?.user as Peer | null;
    const navigate = useNavigate();
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [peers, dispatch] = useReducer(peerReducer, {});
    const [participants, setParticipants] = useState<string[]>([]);
    const [isVideo,SetisVideo]=useState<boolean>(true);
    const [isAudio,SetisAudio]=useState<boolean>(true);



    const cutCall = ({ peerId }: { peerId: string }) => {
        if (socket && user && roomId) {
            socket.emit('leave-room', { roomId, userId: user.id });
            // Properly destroy the PeerJS connection
            if (user && typeof user.destroy === 'function') {
                user.destroy();
            }
            // Stop all tracks in the stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            // Reset state
            setStream(null);
            setParticipants([]);
            navigate('/home');
        }
    }
    // Get user media on mount and cleanup on unmount
    useEffect(() => {
        let localStream: MediaStream | null = null;
        const fetchUserFeed = async () => {
            try {
                localStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setStream(localStream);
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        }
        fetchUserFeed();
        return () => {
            // Cleanup stream on unmount
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            // Also cleanup if stream is still in state
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            setStream(null);
        }
    }, [user, socket]);


    // Attach stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);




    // Join/create room logic
    useEffect(() => {
        if (!roomId) {
            navigate('/');
            return;
        }
        if (socket && user && user.id && stream) {
            // Always join as participant, backend can distinguish creator if needed
            socket.emit('join-room', { roomId, userId: user.id });

            // Leave room on tab close/refresh
            const handleBeforeUnload = () => {
                socket.emit('leave-room', { roomId, userId: user.id });
            };
            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [socket, user, stream, roomId, navigate]);

    // Handle joined-room event and PeerJS call logic
    useEffect(() => {
        if (!socket || !user || !stream) return;

        // Track which peers we've already called
        const calledPeers = new Set<string>();

        const handleJoinedRoom = (data: { roomId: string, userId: string, participants: string[] }) => {
            setParticipants(data.participants);

            // Only call others if you are the new joiner
            if (user.id === data.userId) {
                data.participants
                    .filter(pid => pid !== user.id)
                    .forEach(pid => {
                        if (!calledPeers.has(pid)) {
                            const call = user.call(pid, stream);
                            calledPeers.add(pid);
                            call.on('stream', (remoteStream: MediaStream) => {
                                dispatch({ type: 'ADD_PEER', payload: { peerId: pid, stream: remoteStream } });
                            });
                        }
                    });
            }
        };

        socket.on('joined-room', handleJoinedRoom);

        socket.on('user-left', (data: { roomId: string, userId: string }) => {
            setParticipants(prev => prev.filter(pid => pid !== data.userId));
            dispatch({ type: 'REMOVE_PEER', payload: {peerId:data.userId} });
        })

        // Answer incoming calls
        user.on('call', (call: MediaConnection) => {
            if (stream) {
                call.answer(stream);
                call.on('stream', (remoteStream: MediaStream) => {
                    dispatch({ type: 'ADD_PEER', payload: { peerId: call.peer, stream: remoteStream } });
                });
            }
        });

        return () => {
            socket.off('joined-room', handleJoinedRoom);
            user.off('call');
        };
    }, [socket, user, stream]);

    useEffect(() => {
        console.log('Participants state updated:', participants);
    }, [participants]);

    return (
        <div>
            
            <button
            className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded'
             onClick={() => cutCall({ peerId: user?.id || '' })}>Leave Room</button>
            <p>my video Feed</p>
            <br/>
            <div className='flex justify-between items-center my-4'>
                <span
                onClick={()=>{
                    SetisVideo(!isVideo);
                }}
                 className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded'>
                    {
                        isVideo? "Hide it": "Show it"   
                    } 
                    
                    </span>
                    
                <span className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded'
                onClick={()=>{
                    SetisAudio(!isAudio);
                }}>
                    {
                        isAudio? "Mute it": "Unmute it"
                    }
                </span>
            </div>
            {stream && isVideo && (
                <video
                    ref={videoRef}
                    style={{ width: 300, height: 300 }}
                    autoPlay
                    playsInline
                    className="object-cover"
                />
            )}
            <p>others user feed</p>
            {peers && <OtherVIdeoFeed peers={peers as Record<string, MediaStream>} />}
        </div>
    )
}   

export default Room