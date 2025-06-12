
type Props = {
    peers: Record<string, MediaStream>;
}

const OtherVIdeoFeed = (props: Props) => {
  return (
    <div>
        {Object.entries(props.peers).map(([peerId, stream]) => (
            <div key={peerId} className="w-full h-full">
                <video
                    width={"100px"}
                    height={"100px"}
                    autoPlay
                    
                    playsInline
                    className="w-full h-full object-cover"
                    ref={(video) => {
                        if (video) {
                            video.srcObject = stream;
                        }
                    }}
                />
            </div>
        ))}
    </div>
  )
}

export default OtherVIdeoFeed