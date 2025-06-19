import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    peers: Record<string, MediaStream>;
}

const OtherVideoFeed = (props: Props) => {
    const peerEntries = Object.entries(props.peers);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Show 2 users per slide
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
        const startIndex = currentIndex * usersPerSlide;
        return peerEntries.slice(startIndex, startIndex + usersPerSlide);
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
                
                {/* Show carousel controls even when empty */}
                <div className="flex items-center justify-center gap-4 p-4">
                    <button
                        disabled
                        className="p-3 rounded-full bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5 text-white/50" />
                    </button>
                    
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                    
                    <button
                        disabled
                        className="p-3 rounded-full bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5 text-white/50" />
                    </button>
                </div>
                
                <div className="text-center pb-2">
                    <span className="text-white/50 text-sm">0 of 0 participants</span>
                </div>
            </div>
        );
    }

    const currentUsers = getCurrentUsers();

    return (
        <div className="h-full flex flex-col">
            {/* Video Container */}
            <div className="flex-1 p-4">
                <div className="h-[65vh] grid grid-rows-2 gap-4">
                    {/* First video slot */}
                    <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
                        {currentUsers[0] && (
                            <video
                                autoPlay
                                playsInline
                                muted={false}
                                className="w-full h-full object-cover"
                                ref={(video) => {
                                    if (video && currentUsers[0][1]) {
                                        video.srcObject = currentUsers[0][1];
                                    }
                                }}
                            />
                        )}
                        {!currentUsers[0] && (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-500 text-xl">👤</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Second video slot */}
                    <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
                        {currentUsers[1] && (
                            <video
                                autoPlay
                                playsInline
                                muted={false}
                                className="w-full h-full object-cover"
                                ref={(video) => {
                                    if (video && currentUsers[1][1]) {
                                        video.srcObject = currentUsers[1][1];
                                    }
                                }}
                            />
                        )}
                        {!currentUsers[1] && (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-500 text-xl">👤</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Navigation Controls - Always Visible */}
            <div className="flex items-center justify-center gap-4 p-4">
                <button
                    onClick={prevSlide}
                    disabled={totalSlides <= 1}
                    className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 ${
                        totalSlides > 1 
                            ? 'bg-white/10 hover:bg-white/20 cursor-pointer' 
                            : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                {/* Slide Indicators - Always Show */}
                <div className="flex gap-2">
                    {totalSlides === 0 ? (
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                    ) : (
                        Array.from({ length: Math.max(1, totalSlides) }, (_, index) => (
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
                        ))
                    )}
                </div>
                
                <button
                    onClick={nextSlide}
                    disabled={totalSlides <= 1}
                    className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 ${
                        totalSlides > 1 
                            ? 'bg-white/10 hover:bg-white/20 cursor-pointer' 
                            : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>
            
            {/* Participant count - Always visible */}
            <div className="text-center pb-2">
                <span className="text-white/70 text-sm">
                    {peerEntries.length === 0 
                        ? '0 of 0 participants'
                        : totalSlides > 1 
                            ? `${currentIndex * usersPerSlide + 1}-${Math.min((currentIndex + 1) * usersPerSlide, peerEntries.length)} of ${peerEntries.length}`
                            : `${peerEntries.length} participant${peerEntries.length !== 1 ? 's' : ''}`
                    }
                </span>
            </div>
        </div>
    );
};

export default OtherVideoFeed;