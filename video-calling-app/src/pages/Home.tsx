import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState<string | null>();

    const copytoClipboard = () => {
        navigator.clipboard.writeText(roomId!).then(() => {
            toast.success("Room ID copied to clipboard");
        })
    }

    const createRoom = () => {
        const roomId = uuidv4();
        // Only navigate, don't emit
        navigate(`/room/${roomId}`);
    }

    const joinRoom = (e:React.FormEvent) => {
        // Only navigate, don't emit
        navigate(`/room/${roomId}`);
    }
    return (
        <div className="w-full h-[92vh] flex flex-col  justify-center items-center">
            <div className="w-[60%] h-[40%] bg-base-200 p-14 rounded-4xl  flex flex-col gap-y-6 justify-center items-center shadow-2xl shadow-base-500">
                <div className="w-[80%] flex flex-col items-center justify-center">
                    <button type="submit" 
                    onClick={createRoom}
                    className="btn w-[20rem] btn-xs bg-base-100 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-2xl hover:bg-base-300 ">Create Meeting</button>
                </div>
                <div className="w-[80%] h-[16%] border-t border-b border-dashed border-base-400 p-2">
                    <p className="text-xl font-sans text-center">OR</p>
                </div>
                <form onSubmit={joinRoom} className="w-[80%]  flex flex-col gap-y-4 items-center">
                    <input type="text" 
                    value={roomId ?? ""}
                    onChange={(e)=>{
                        setRoomId(e.target.value)
                    }}
                    placeholder="Enter code here" className="input rounded-lg py-6 px-4 text-lg font-semibold w-full focus:outline-none focus:border-success" />   
                    <button type="submit" className="btn w-[20rem] btn-xs bg-base-100 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-2xl hover:bg-base-300">Join Meeting</button>
                </form>
            </div>

        </div>
    );
}

export default Home