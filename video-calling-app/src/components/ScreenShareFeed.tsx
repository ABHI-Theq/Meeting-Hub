import { useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, MonitorOff, User } from 'lucide-react';

type Props = {
    screenShares: Record<string, MediaStream>;
    localScreenShare?: MediaStream | null;
    isLocalSharing?: boolean;
};

const ScreenShareFeed = ({ screenShares, localScreenShare, isLocalSharing }: Props) => {
    const screenEntries = Object.entries(screenShares);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Include local screen share if active
    const allScreens = [
        ...(isLocalSharing && localScreenShare ? [['local', localScreenShare] as [string, MediaStream]] : []),
        ...screenEntries
    ];

    const screensPerSlide = 1; // Show one screen at a time for better visibility
    const totalSlides = Math.ceil(allScreens.length / screensPerSlide);

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

    const getCurrentScreens = () => {
        const start = currentIndex * screensPerSlide;
        return allScreens.slice(start, start + screensPerSlide);
    };

    if (allScreens.length === 0) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                            <MonitorOff className="text-gray-400 text-2xl w-8 h-8" />
                        </div>
                        <p className="text-gray-400 text-lg mb-2">No screen sharing active</p>
                        <p className="text-gray-500 text-sm">Click the screen share button to start sharing</p>
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

                <div className="text-center pb-2 text-white/50 text-sm">0 screens shared</div>
            </div>
        );
    }

    const currentScreens = getCurrentScreens();

    return (
        <div className="h-full flex flex-col">
            {/* Screen Share Area */}
            <div className="flex-1 p-4">
                <div className="h-[65vh]">
                    {currentScreens.map(([peerId, stream], i) => {
                        const isLocal = peerId === 'local';
                        
                        return (
                            <div key={i} className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl h-full">
                                <video
                                    autoPlay
                                    playsInline
                                    muted={isLocal} // Mute local screen share to avoid feedback
                                    className="w-full h-full object-contain bg-black"
                                    ref={(video) => {
                                        if (video) video.srcObject = stream;
                                    }}
                                />

                                {/* Overlay with presenter info */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <Monitor className="w-5 h-5 text-blue-400" />
                                        <span className="text-white font-medium">
                                            {isLocal ? 'Your Screen' : `${peerId}'s Screen`}
                                        </span>
                                    </div>
                                    
                                    <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                                        <span className="text-white/80 text-sm">Screen Share</span>
                                    </div>
                                </div>

                                {/* Bottom presenter info */}
                                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                            {isLocal ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <span className="text-white text-sm font-bold">
                                                    {peerId.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">
                                                {isLocal ? 'You are presenting' : `${peerId} is presenting`}
                                            </p>
                                            <p className="text-white/70 text-sm">Screen sharing active</p>
                                        </div>
                                    </div>
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
                    className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 ${
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
                    ? `${currentIndex + 1} of ${totalSlides} screens`
                    : `${allScreens.length} screen${allScreens.length !== 1 ? 's' : ''} shared`}
            </div>
        </div>
    );
};

export default ScreenShareFeed;