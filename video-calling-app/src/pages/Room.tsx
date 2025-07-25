import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import Peer from 'peerjs';
import type { MediaConnection } from 'peerjs';
import { Video, VideoOff, Mic, MicOff, PhoneOff, User, Copy, Users, Settings, Monitor, MonitorOff } from 'lucide-react';
import { peerReducer, screenShareReducer } from '../Reducer/peerReducer';
import { addPeerAction, removePeerAction, addScreenShareAction, removeScreenShareAction } from '../Actions/peerAction';
import OtherVIdeoFeed from '../components/OtherVIdeoFeed';
import ScreenShareFeed from '../components/ScreenShareFeed';
import useScreenShare from '../hooks/useScreenShare';

const Room = () => {
    const { roomId } = useParams();
    const SocketContext = useSocket();
    const socket = SocketContext?.socket;
    const user: Peer | null = SocketContext?.user as Peer | null;
    const navigate = useNavigate();
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [peers, dispatch] = useReducer(peerReducer, {});
    const [screenShares, screenDispatch] = useReducer(screenShareReducer, {});
    const [participants, setParticipants] = useState<string[]>([]);
    const [isVideo, setIsVideo] = useState<boolean>(true);
    const [isAudio, setIsAudio] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showCopied, setShowCopied] = useState<boolean>(false);
    const [activeView, setActiveView] = useState<'participants' | 'screen'>('participants');
    const { isSharing, screenStream, toggleScreenShare } = useScreenShare();

    // Toggle video track
    const toggleVideo = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideo(videoTrack.enabled);
            }
        }
    };

    // Toggle audio track
    const toggleAudio = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudio(audioTrack.enabled);
            }
        }
    };

    // Handle screen share toggle
    const handleScreenShare = async () => {
        const stream = await toggleScreenShare();
        
        if (stream && user) {
            // Call all participants with screen share
            participants
                .filter(pid => pid !== user.id)
                .forEach(pid => {
                    const call = user.call(`${pid}-screen`, stream);
                    call.on('stream', (remoteStream: MediaStream) => {
                        console.log('Received screen share from:', pid);
                    });
                });
        } else if (!stream && user) {
            // Notify others that screen sharing stopped
            participants
                .filter(pid => pid !== user.id)
                .forEach(pid => {
                    // The stream will automatically end, triggering cleanup
                });
        }
    };

    const cutCall = () => {
        if (socket && user && roomId) {
            socket.emit('leave-room', { roomId, userId: user.id });
            // Properly destroy the PeerJS connection
            // if (user && typeof user.destroy === 'function') {
            //     user.destroy();
            // }
            setParticipants(
                (prevParticipants) => prevParticipants.filter(pid => pid !== user.id)
            )
            // Stop all tracks in the stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            // Stop screen sharing if active
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());
            }
            // Reset state
            setStream(null);
            setParticipants([]);
            navigate('/home');
        }
    };

    const copyRoomId = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        }
    };

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
                setIsLoading(false);
            } catch (error) {
                console.error('Error accessing media devices.', error);
                setIsLoading(false);
            }
        };
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
            // Cleanup screen share
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());
            }
            setStream(null);
        };
    }, [user, socket]);

    // Attach stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream,isVideo,participants]);


    // Join/create room logic
    useEffect(() => {
        if (!roomId) {
            navigate('/');
            return;
        }
        if (socket && user && user.id) {
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
                                dispatch(addPeerAction(pid, remoteStream));
                            });
                            
                            // Also call for screen share if we're sharing
                            if (screenStream) {
                                const screenCall = user.call(`${pid}-screen`, screenStream);
                                screenCall.on('stream', (remoteScreenStream: MediaStream) => {
                                    console.log('Screen share connected to:', pid);
                                });
                            }
                        }
                    });
            }
        };

        socket.on('joined-room', handleJoinedRoom);

        socket.on('user-left', (data: { roomId: string, userId: string }) => {
            setParticipants(prev => prev.filter(pid => pid !== data.userId));
            dispatch(removePeerAction(data.userId));
            screenDispatch(removeScreenShareAction(data.userId));
        });

        // Answer incoming calls
        user.on('call', (call: MediaConnection) => {
            const isScreenShare = call.peer.includes('-screen');
            
            if (isScreenShare) {
                // Handle screen share call
                call.answer(); // Don't send our stream for screen share calls
                call.on('stream', (remoteScreenStream: MediaStream) => {
                    const actualPeerId = call.peer.replace('-screen', '');
                    screenDispatch(addScreenShareAction(actualPeerId, remoteScreenStream));
                    // Auto-switch to screen share view when someone starts sharing
                    setActiveView('screen');
                });
            } else {
                // Handle regular video call
                if (stream) {
                    call.answer(stream);
                    call.on('stream', (remoteStream: MediaStream) => {
                        dispatch(addPeerAction(call.peer, remoteStream));
                    });
                }
            }
        });

        return () => {
            socket.off('joined-room', handleJoinedRoom);
            user.off('call');
        };
    }, [socket, user, stream, screenStream]);

    // Auto-switch view based on screen sharing activity
    useEffect(() => {
        const hasActiveScreenShares = Object.keys(screenShares).length > 0 || isSharing;
        if (hasActiveScreenShares && activeView === 'participants') {
            setActiveView('screen');
        } else if (!hasActiveScreenShares && activeView === 'screen') {
            setActiveView('participants');
        }
    }, [screenShares, isSharing, activeView]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Setting up your camera and microphone...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="glass-effect rounded-2xl px-6 py-3">
                            <div className="flex items-center gap-3">
                                <Video className="w-5 h-5 text-purple-400" />
                                <span className="text-white font-semibold">VideoConnect Pro</span>
                            </div>
                        </div>
                        <div className="glass-effect rounded-2xl px-4 py-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-300" />
                            <span className="text-white text-sm">{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="glass-effect rounded-2xl px-4 py-3 flex items-center gap-2">
                            <span className="text-gray-300 text-sm">Room ID:</span>
                            <span className="text-white font-mono text-sm">{roomId}</span>
                            <button
                                onClick={copyRoomId}
                                className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                                title="Copy Room ID"
                            >
                                <Copy className="w-4 h-4 text-gray-300" />
                            </button>
                        </div>
                        {showCopied && (
                            <div className="glass-effect rounded-xl px-3 py-2">
                                <span className="text-green-400 text-sm">Copied!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="h-screen flex items-center justify-center p-6 pt-24">
                <div className="w-full max-w-7xl h-full flex gap-6">
                    {/* Local Video Feed */}
                    <div className="w-[50%] h-full glass-effect rounded-3xl p-6 flex flex-col">
                        <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-900">
                            {stream && isVideo ? (
                                <video
                                    ref={videoRef}
                                    muted
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                    <div className="text-center">
                                        <User className="w-24 h-24 text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-400">Camera is off</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Status Indicators */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {!isVideo && (
                                    <div className="bg-red-500 rounded-full px-3 py-1 flex items-center gap-1">
                                        <VideoOff className="w-3 h-3 text-white" />
                                        <span className="text-white text-xs">Camera Off</span>
                                    </div>
                                )}
                                {!isAudio && (
                                    <div className="bg-red-500 rounded-full px-3 py-1 flex items-center gap-1">
                                        <MicOff className="w-3 h-3 text-white" />
                                        <span className="text-white text-xs">Muted</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                className={`p-4 rounded-2xl transition-all duration-300 ${
                                    isVideo 
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                                onClick={toggleVideo}
                                title={isVideo ? 'Turn off camera' : 'Turn on camera'}
                            >
                                {isVideo ? (
                                    <Video className="w-6 h-6" />
                                ) : (
                                    <VideoOff className="w-6 h-6" />
                                )}
                            </button>

                            <button
                                className={`p-4 rounded-2xl transition-all duration-300 ${
                                    isAudio 
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                                onClick={toggleAudio}
                                title={isAudio ? 'Mute microphone' : 'Unmute microphone'}
                            >
                                {isAudio ? (
                                    <Mic className="w-6 h-6" />
                                ) : (
                                    <MicOff className="w-6 h-6" />
                                )}
                            </button>

                            <button
                                className={`p-4 rounded-2xl transition-all duration-300 ${
                                    isSharing 
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                                onClick={handleScreenShare}
                                title={isSharing ? 'Stop screen sharing' : 'Start screen sharing'}
                            >
                                {isSharing ? (
                                    <MonitorOff className="w-6 h-6" />
                                ) : (
                                    <Monitor className="w-6 h-6" />
                                )}
                            </button>

                            <button
                                className="p-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
                                onClick={cutCall}
                                title="Leave call"
                            >
                                <PhoneOff className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Remote Video Feeds */}
                    <div className="flex-1 h-full glass-effect rounded-3xl p-6">
                        <div className="h-full flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setActiveView('participants')}
                                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                            activeView === 'participants'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        <Users className="w-4 h-4 inline mr-2" />
                                        Participants
                                    </button>
                                    <button
                                        onClick={() => setActiveView('screen')}
                                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                            activeView === 'screen'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        <Monitor className="w-4 h-4 inline mr-2" />
                                        Screen Share
                                        {(Object.keys(screenShares).length > 0 || isSharing) && (
                                            <span className="ml-2 w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="flex-1 rounded-2xl bg-black/20 overflow-hidden">
                                {activeView === 'participants' ? (
                                    Object.keys(peers).length > 0 ? (
                                        <OtherVIdeoFeed peers={peers as Record<string, MediaStream>} />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                                <p className="text-gray-400 text-lg mb-2">Waiting for others to join</p>
                                                <p className="text-gray-500 text-sm">Share the room ID to invite participants</p>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <ScreenShareFeed 
                                        screenShares={screenShares as Record<string, MediaStream>}
                                        localScreenShare={screenStream}
                                        isLocalSharing={isSharing}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;