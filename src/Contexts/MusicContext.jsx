import { createContext , use, useState , useEffect } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({children}) =>{
    const songs = [
    {  id : 1 , title : "Song One" , artist : "Artist A" , duration : "2:22" , url : "/songs/10-hertz-binaural-beat-frequency-tone-sound-wav-379129.mp3" },
    {  id : 2 , title : "Song Two" , artist : "Artist B" , duration : "4:00" , url :  "/songs/afro-11-324020.mp3"},
    {  id : 3 , title : "Song Three" , artist : "Artist C" , duration : "3:19" , url : "/songs/atlantic-lights-immensity-402593.mp3" },
    {  id : 4 , title : "Song Four" , artist : "Artist D" , duration : "2:20" , url : "/songs/audio-club-amapiano-319840.mp3" },  
    {  id : 5 , title : "Song Five" , artist : "Artist E" , duration : "2:45" , url : "/songs/eterna-cancao-wav-12569.mp3"  },
    {  id : 6 , title : "Song Six" , artist : "Artist F" , duration : "2:59" , url : "/songs/memphis-trap-wav-349366.mp3"  },  
    {  id : 7 , title : "Song Seven" , artist : "Artist G" , duration : "1:25" , url : "/songs/sci-fi-background-258999.mp3" },
    {  id : 8 , title : "Song Eight" , artist : "Artist H" , duration : "1:16" , url : "/songs/see-you-later-203103.mp3"   },
    {  id : 9 , title : "Song Nine" , artist : "Artist I" , duration : "0:59" , url : "/songs/twisterion-b1-221376.mp3"  },
    {  id : 10 , title : "Song Ten" , artist : "Artist J" , duration : "2:47" , url : "/songs/warm-nights-amp-lofi-dreams-archer-sounds-321177.mp3"  }

    ]

    const [allsongs , setAllsongs] = useState(songs);
    const [currentTrack , setCurrentTrack] = useState(songs[0]);
    const [currentTrackIndex , setCurrentTrackIndex] = useState(0);
    const [currentTime , setCurrentTime] = useState(0);
    const [duration , setDuration] = useState(0);
    const [volume , setVolume] = useState(1);
    const [isPlaying , setIsPlaying] = useState(false);
    const [playlists , setPlaylists] = useState([]);
    

    useEffect(() => {
        const storedPlaylists = localStorage.getItem("musicPlayerPlaylists");
        if (storedPlaylists) {
            const playlists = JSON.parse(storedPlaylists);
            setPlaylists(playlists);
        }
    },[]);

    useEffect(() => {
        if (playlists.length > 0) {
            localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
        }
       else{
            localStorage.removeItem("musicPlayerPlaylists");
        }
    },[playlists]);

    const handlePlaySong = (song, index) =>{
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
        setIsPlaying(false);
    }
    
    const formatTime = (time) =>{
    if(isNaN(time) || time === Infinity)
        return "0:00";  
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    const nextTrack = () =>{
        setCurrentTrackIndex((prev)=>{
        const nextIndex = (prev + 1) % allsongs.length;
        setCurrentTrack(allsongs[nextIndex]);
        return nextIndex;
        })
        setIsPlaying(false);
    }
    
    const prevTrack = () =>{
        setCurrentTrackIndex((prev)=>{
            const nextIndex = prev === 0 ? allsongs.length-1 : prev-1;
            setCurrentTrack(allsongs[nextIndex]);
            return nextIndex;
        })
        setIsPlaying(false);
    }

    const createPlaylist = (name) =>{
        const newPlayList = {
            id : Date.now(),
            name : name,
            songs : [],
        };
        setPlaylists((prev)=>[...prev , newPlayList]);
    }

    const addSongToPlaylist = (playlistId , song) =>{
        setPlaylists((prev)=> prev.map((pl)=>{
            if (pl.id === playlistId){
                return {
                    ...pl,
                    songs : [...pl.songs , song],
                }}   
            else return pl;
        }))
    }
    
    const deletePlaylist = (playlistId) =>{
        setPlaylists((prev)=> prev.filter((pl)=> pl.id !== playlistId));
    }

    const play = () =>{ setIsPlaying(true); }
    const pause = () =>{ setIsPlaying(false); }

    return <MusicContext.Provider value={{
        allsongs , 
         handlePlaySong , 
         currentTrack , 
         currentTrackIndex , 
         currentTime , 
         setCurrentTime , 
         formatTime , 
         duration,
         setDuration,
         nextTrack,
         prevTrack,
         play,
         pause,
         isPlaying,
         volume,
         setVolume,
         playlists,
         createPlaylist,
         addSongToPlaylist,
         deletePlaylist
    }} >{children}</MusicContext.Provider>
}