import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Video, Users, Copy, ArrowRight, Sparkles, Plus, LogIn } from "lucide-react";
import useCheck from "../hooks/RoomCheck";

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState<string>("");
    const { check, roomcheck, loading } = useCheck()

    const copytoClipboard = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId).then(() => {
                toast.success("Room ID copied to clipboard", {
                    style: {
                        background: '#10B981',
                        color: 'white',
                    },
                });
            });
        }
    };

    const createRoom = () => {
        const newRoomId = uuidv4();
        navigate(`/room/${newRoomId}`);
    };

    const joinRoom = async (e: React.FormEvent) => {
        e.preventDefault();

        if (roomId.trim()) {
            await roomcheck({ roomId })
            if (check) {
                navigate(`/room/${roomId}`);
            }
        } else {
            toast.error("Please enter a valid room ID", {
                style: {
                    background: '#EF4444',
                    color: 'white',
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-8">
                {/* Header section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg">
                            <Video className="w-8 h-8 text-primary-content" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Meeting Hub
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
                        Connect with your team instantly. Create a new meeting or join an existing one with ease.
                    </p>
                </div>

                {/* Main card */}
                <div className="w-full max-w-2xl">
                    <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-content/10 p-8 md:p-12 animate-slide-up">
                        {/* Create meeting section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-success/20 rounded-xl">
                                    <Plus className="w-5 h-5 text-success" />
                                </div>
                                <h2 className="text-2xl font-bold text-base-content">Start New Meeting</h2>
                            </div>

                            <button
                                type="button"
                                onClick={createRoom}
                                className="group w-full bg-gradient-to-r from-success to-success-focus hover:from-success-focus hover:to-success text-success-content font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-success/25 flex items-center justify-center gap-3"
                            >
                                <Video className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                <span className="text-lg">Create Meeting Room</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-dashed border-base-content/30"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="bg-base-100 px-6 py-2 rounded-full border border-base-content/20">
                                    <span className="text-base-content/60 font-medium flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        OR
                                        <Sparkles className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Join meeting section */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/20 rounded-xl">
                                    <LogIn className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-base-content">
                                    Join existing Meeting
                                </h2>
                            </div>

                            <form onSubmit={joinRoom} className="space-y-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                        placeholder="Enter meeting room ID"
                                        className="w-full bg-base-200/50 border-2 border-base-content/20 focus:border-primary focus:bg-base-100 rounded-2xl py-4 px-6 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-base-content/50"
                                    />
                                    {roomId && (
                                        <button
                                            type="button"
                                            onClick={copytoClipboard}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-base-300 rounded-xl transition-colors duration-200 group"
                                            title="Copy to clipboard"
                                        >
                                            <Copy className="w-5 h-5 text-base-content/60 group-hover:text-primary" />
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!roomId.trim()}
                                    className="group w-full bg-gradient-to-r from-primary to-primary-focus hover:from-primary-focus hover:to-primary text-primary-content font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/25 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                >
                                    <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-lg">
                                        {
                                        loading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Joining...</span>
                                            </div>
                                        ) :
                                            ("Join Meeting")
                                    }
                                    </span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-base-100/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-base-content/10 hover:bg-base-100/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Video className="w-6 h-6 text-success" />
                            </div>
                            <h3 className="font-bold text-base-content mb-2">HD Video</h3>
                            <p className="text-sm text-base-content/70">Crystal clear video quality</p>
                        </div>

                        <div className="bg-base-100/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-base-content/10 hover:bg-base-100/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-base-content mb-2">Team Chat</h3>
                            <p className="text-sm text-base-content/70">Real-time messaging</p>
                        </div>

                        <div className="bg-base-100/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-base-content/10 hover:bg-base-100/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="font-bold text-base-content mb-2">Secure</h3>
                            <p className="text-sm text-base-content/70">End-to-end encryption</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;