import {v4 as uuidv4} from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
    const navigate=useNavigate();
    const [roomId, setRoomId] = useState<string | null>();

    const createRoom = () => {
        const roomId = uuidv4();
        // Only navigate, don't emit
        navigate(`/room/${roomId}`);
    }

    const joinRoom = (roomId: string) => {
        // Only navigate, don't emit
        navigate(`/room/${roomId}`);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button onClick={createRoom} className="bg-blue-600 text-white p-2 rounded">
                Create a new Room
            </button>
            <p className="mt-4 text-gray-700"></p>
            <input
                type="text"
                placeholder="Enter Room ID"
                className="border p-2 rounded w-64"
                value={roomId as string}
                onChange={(e)=>{
                    setRoomId(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const roomId = (e.target as HTMLInputElement).value;
                        joinRoom(roomId);
                    }
                }}
            />
            <button
            onClick={() => roomId && joinRoom(roomId)}
                className="bg-green-600 text-white p-2 rounded mt-2"
            >Join room</button>
        </div>
    );
}

export default Home