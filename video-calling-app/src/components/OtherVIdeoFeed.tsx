import { useState } from 'react';
import { ChevronLeft, ChevronRight, VideoOff as VideoOffIcon, MicOff } from 'lucide-react';

type Props = {
    peers: Record<string, MediaStream>;
};

const OtherVideoFeed = ({ peers }: Props) => {
    const peerEntries = Object.entries(peers);
    const [currentIndex, setCurrentIndex] = useState(0);

    const usersPerSlide = 2;
    const totalSlides = Math.ceil(peerEntries.length / usersPerSlide);

    const nextSlide = () => {
        if (totalSlides > 1) {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }
    };

    const prevSlide = () => {
        if (totalSlides > 1) {
            setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        }
    };

    const getCurrentUsers = () => {
        const start = currentIndex * usersPerSlide;
        return peerEntries.slice(start, start + usersPerSlide);
    };

    if (peerEntries.length === 0) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                            <span className="text-gray-400 text-2xl">👥</span>
                        </div>
                        <p className="text-gray-400 text-lg mb-2">Waiting for others to join</p>
                        <p className="text-gray-500 text-sm">Share the room ID to invite participants</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 p-4">
                    <button disabled className="p-3 rounded-full bg-white/5 border border-white/10 opacity-50 cursor-not-allowed">
                        <ChevronLeft className="w-5 h-5 text-white/50" />
                    </button>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                    <button disabled className="p-3 rounded-full bg-white/5 border border-white/10 opacity-50 cursor-not-allowed">
                        <ChevronRight className="w-5 h-5 text-white/50" />
                    </button>
                </div>

                <div className="text-center pb-2 text-white/50 text-sm">0 of 0 participants</div>
            </div>
        );
    }

    const currentUsers = getCurrentUsers();

    return (
        <div className="h-full flex flex-col">
            {/* Video Area */}
            <div className="flex-1 p-4">
                <div className="h-[65vh] grid grid-rows-2 gap-4">
                    {Array.from({ length: usersPerSlide }).map((_, i) => {
                        const [peerId, stream] = currentUsers[i] || [];
                        const videoTrack = stream?.getVideoTracks()?.[0];
                        const isVideoEnabled = videoTrack?.enabled ?? false;
                        const audioTrack = stream?.getAudioTracks()?.[0];
                        const isAudioEnabled = audioTrack?.enabled ?? false;

                        return (
                            <div key={i} className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
                                {stream && isVideoEnabled ? (
                                    <video
                                        autoPlay
                                        playsInline
                                        muted={false}
                                        className="w-full h-full object-cover"
                                        ref={(video) => {
                                            if (video) video.srcObject = stream;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                                        <VideoOffIcon className="text-gray-500 w-8 h-8 mb-2" />
                                        <span className="text-gray-500 text-sm">Camera Off</span>
                                    </div>
                                )}

                                {/* Overlay bottom name and mic */}
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs flex items-center justify-between">
                                    <span>{peerId || "Unknown"}</span>
                                    {!isAudioEnabled && (
                                        <MicOff className="w-4 h-4 text-red-400 ml-2"/>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 p-4">
                <button
                    onClick={prevSlide}
                    disabled={totalSlides <= 1}
                    className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white ${
                        totalSlides > 1 ? 'bg-white/10 hover:bg-white/20 cursor-pointer' : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: Math.max(1, totalSlides) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => totalSlides > 1 && setCurrentIndex(index)}
                            disabled={totalSlides <= 1}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentIndex
                                    ? 'bg-white'
                                    : totalSlides > 1
                                    ? 'bg-white/30 hover:bg-white/50 cursor-pointer'
                                    : 'bg-white/30 cursor-default'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={totalSlides <= 1}
                    className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 ${
                        totalSlides > 1 ? 'bg-white/10 hover:bg-white/20 cursor-pointer' : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="text-center pb-2 text-white/70 text-sm">
                {totalSlides > 1
                    ? `${currentIndex * usersPerSlide + 1}-${Math.min((currentIndex + 1) * usersPerSlide, peerEntries.length)} of ${peerEntries.length}`
                    : `${peerEntries.length} participant${peerEntries.length !== 1 ? 's' : ''}`}
            </div>
        </div>
    );
};

export default OtherVideoFeed;
