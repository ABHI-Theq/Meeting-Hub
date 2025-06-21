import { createContext, useEffect, useState ,useContext } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { Peer } from "peerjs"; // Assuming you are using PeerJS for WebRTC connections
import { v4 as uuidv4 } from "uuid"; // For generating unique user IDs
// Define the context type to include both socket and participants
type SocketContextType = {
    socket: Socket | null;
    user: Peer | null;
};

const SocketContext = createContext<SocketContextType | null>(null);
export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [user,setUser]=useState<Peer | null>(null);


    useEffect(() => {
        if(!socket){
            const WS = io("http://localhost:5500", {

            });
            setSocket(WS);
            WS.on("connect", () => {
                console.log("Connected to WebSocket server");
            });
            const userId= uuidv4(); // Generate a unique user ID
               const newPeer = new Peer(userId, {
            host: "meeting-hub-peer-server.onrender.com",
            path: "/peerjs/myapp",
            secure: true,

        });

            setUser(newPeer);
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{user,socket}}>
            {children}
        </SocketContext.Provider>
    );
}
