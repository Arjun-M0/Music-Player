import { MusicContext } from "../Contexts/MusicContext";
import { use, useContext, useEffect, useRef } from "react";

export const MusicPlayer = () =>{
    const { currentTrack ,
            setCurrentTime,
            currentTime , 
            formatTime , 
            duration , 
            setDuration , 
            nextTrack , 
            prevTrack , 
            isPlaying, 
            play, 
            pause,
            volume,
            setVolume
        } = useContext(MusicContext); 
    const audioRef = useRef(null);

    const handleTimeChange = (e) =>{
        const audio = audioRef.current;
        if(!audio) return;
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e) =>{
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    }

    useEffect(() =>{
        const audio = audioRef.current;
        if(!audio) return;
        
        audio.volume = volume;
    },[volume])

    useEffect(() =>{
        const audio = audioRef.current;
        if(!audio) return;

        if(isPlaying){
            audio.play().catch((error) =>{console.error(error);});
        }else{
            audio.pause();
        }
    },[isPlaying])


    useEffect(() =>{
        const audio = audioRef.current;
        if(!audio) return;

        const handleLoadedMetadata = () =>{
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () =>{
            setCurrentTime(audio.currentTime);
        };
        
        const handleEnded = () =>{
            nextTrack();
        };

        audio.addEventListener("loadedmetadata" , handleLoadedMetadata);
        audio.addEventListener("canplay" , handleLoadedMetadata);
        audio.addEventListener("timeupdate" , handleTimeUpdate);
        audio.addEventListener("ended" , handleEnded);

        return () =>{
            audio.removeEventListener("loadedmetadata" , handleLoadedMetadata);
            audio.removeEventListener("canplay" , handleLoadedMetadata);
            audio.removeEventListener("timeupdate" , handleTimeUpdate);
            audio.removeEventListener("ended" , handleEnded);
        };
    }, [setDuration,setCurrentTime,currentTrack,nextTrack]);

    useEffect(()=>{
        const audio = audioRef.current;
        if(!audio) return;

        audio.load();
        setCurrentTime(0);
        setDuration(0);
    },[currentTrack,setCurrentTime,setDuration])

    const progressPercentage = duration > 0 ? (currentTime/duration)*100 : 0;

    return(
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous"/>

            <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
            </div>

            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input type="range" 
                 className="progress-bar" 
                 min="0" 
                 max={duration} 
                 value={currentTime} 
                 step="0.1" 
                 onChange={handleTimeChange}
                 style = {{"--progress": `${progressPercentage}%`}} />
                <span className="duration">{formatTime(duration)}</span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={prevTrack}>⏮</button>
                <button className="control-btn play-btn" onClick={ () => {isPlaying?pause():play()}}>
                    {isPlaying ? "⏸" : "▶"}</button>
                <button className="control-btn" onClick={nextTrack}>⏭</button>
            </div>

            <div className="volume-container">
                <span className="volume-icon">{volume==0?"🔇":"🔊"}</span>
                <input type="range" className="volume-bar" min="0" max="1" step="0.1" onChange={handleVolumeChange} />
            </div>
        </div>
    )
}