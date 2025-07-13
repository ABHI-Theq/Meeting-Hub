import { useState, useCallback, useRef } from 'react';
import { toast } from 'react-hot-toast';

export const useScreenShare = () => {
    const [isSharing, setIsSharing] = useState(false);
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
    const screenStreamRef = useRef<MediaStream | null>(null);

    const startScreenShare = useCallback(async (): Promise<MediaStream | null> => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    mediaSource: 'screen',
                    width: { ideal: 1920, max: 1920 },
                    height: { ideal: 1080, max: 1080 },
                    frameRate: { ideal: 30, max: 60 }
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });

            // Listen for when user stops sharing via browser UI
            stream.getVideoTracks()[0].addEventListener('ended', () => {
                stopScreenShare();
                toast.info('Screen sharing stopped');
            });

            setScreenStream(stream);
            screenStreamRef.current = stream;
            setIsSharing(true);
            toast.success('Screen sharing started');
            
            return stream;
        } catch (error: any) {
            console.error('Error starting screen share:', error);
            
            if (error.name === 'NotAllowedError') {
                toast.error('Screen sharing permission denied');
            } else if (error.name === 'NotFoundError') {
                toast.error('No screen available to share');
            } else if (error.name === 'NotSupportedError') {
                toast.error('Screen sharing not supported in this browser');
            } else {
                toast.error('Failed to start screen sharing');
            }
            
            return null;
        }
    }, []);

    const stopScreenShare = useCallback(() => {
        if (screenStreamRef.current) {
            screenStreamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            screenStreamRef.current = null;
        }
        
        setScreenStream(null);
        setIsSharing(false);
        toast.info('Screen sharing stopped');
    }, []);

    const toggleScreenShare = useCallback(async (): Promise<MediaStream | null> => {
        if (isSharing) {
            stopScreenShare();
            return null;
        } else {
            return await startScreenShare();
        }
    }, [isSharing, startScreenShare, stopScreenShare]);

    return {
        isSharing,
        screenStream,
        startScreenShare,
        stopScreenShare,
        toggleScreenShare
    };
};

export default useScreenShare;