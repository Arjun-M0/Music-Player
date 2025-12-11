import React, { useContext, useState } from "react";
import { MusicContext } from "../Contexts/MusicContext";

export const Playlist = () =>{
    const [newPlaylistName , setNewPlaylistName] = useState("");
    const [selectedPlaylist , setSelectedPlaylist] = useState(null);
    const [searchQuery , setSearchQuery] = useState("");
    const [showDropdown , setShowDropdown] = useState(false);

    const {playlists, createPlaylist , allsongs , addSongToPlaylist , currentTrackIndex , handlePlaySong , deletePlaylist} = useContext(MusicContext);

    const filteredSongs = allsongs.filter((song)=>{
        const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        song.artist.toLowerCase().includes(searchQuery.toLowerCase());
        const isAlreadyInPlaylist = selectedPlaylist?.songs.some((s)=> s.id === song.id);
        return matches && !isAlreadyInPlaylist;
    })

    const handleCreatePlaylist = () =>{
        if (newPlaylistName.trim()){
            createPlaylist(newPlaylistName.trim());
            setNewPlaylistName("");
        }
    };

    const handleAddSong = (song)=>{
        if (selectedPlaylist){
            addSongToPlaylist(selectedPlaylist.id , song);
            setSearchQuery("");
            setShowDropdown(false);
        }
    }

    const handlePlayFromPlaylist = (song) =>{
        const songIndex = allsongs.findIndex((s)=> s.id === song.id);
        handlePlaySong(song , songIndex);
    }

    const deletePlaylistConfirmation = (playlist) =>{
        const confirmDelete = window.confirm(`Are you sure you want to delete the playlist "${playlist.name}"?`);
        if (confirmDelete){
            deletePlaylist(playlist.id);
        }
    }


    return(
        <div className="playlists">
            <h2>Your Playlists</h2>

            <div className="create-playlist">
                <h3>Create New Playlist</h3>
                <div className="playlist-form">
                    <input type="text" 
                     placeholder="Playlist Name" 
                     className="playlist-input"
                     onChange = {(e)=> setNewPlaylistName(e.target.value)}
                     value = {newPlaylistName}/>
                    <button className = "create-btn" onClick={handleCreatePlaylist}>Create</button>
                </div>
            </div>

            <div className="playlists-list">
                {playlists.length === 0 ? (
                    <p className="empty-message">No playlists created yet.</p>
                ) : ( playlists.map((pl,key)=>(
                    <div key={key} className="playlist-item">
                        <div className="playlist-header">
                            <h3>{pl.name}</h3>
                            <div className="playlist-actions">
                                <button className="delete-playlist-btn" onClick={()=>{deletePlaylistConfirmation(pl)}}>Delete</button>
                            </div>
                        </div>
                        <div className="add-song-section">
                            <div className="search-container">
                                <input 
                                type="text" 
                                placeholder="Search songs to add..." 
                                value = {selectedPlaylist?.id === pl.id ? searchQuery : ""}
                                onChange={(e)=>{
                                    setSearchQuery(e.target.value);
                                    setSelectedPlaylist(pl);
                                    setShowDropdown(e.target.value.length > 0);
                                }}
                                onFocus={(e)=>{
                                    setSelectedPlaylist(pl);
                                    setShowDropdown(e.target.value.length > 0);
                                }}
                                className="song-search-input"/>

                                { selectedPlaylist?.id === pl.id && showDropdown && (
                                    <div className="song-dropdown">
                                        { filteredSongs.length === 0 ? (
                                            <div className="dropdown-item no-results">No songs found.</div>):
                                            ( filteredSongs.slice(0,5).map((song,key)=>(
                                                <div key={key} 
                                                 className="dropdown-item"
                                                 onClick={()=>handleAddSong(song)}
                                                 >
                                                    <span className="song-title">{song.title}</span>
                                                    <span className="song-artist">{song.artist}</span>
                                                </div>
                                            )))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="playlist-songs">
                            {pl.songs.length === 0 ? (
                                <p className="empty-playlist">No songs in this playlist.</p>
                            ) : ( pl.songs.map((song,key)=>(
                                <div key={key} className={`playlist-song ${currentTrackIndex === allsongs.indexOf(song) ? "active" : ""}`}
                                onClick={()=>{handlePlayFromPlaylist(song)}}>
                                    <div className="song-info">
                                        <span className="song-title">{song.title}</span> 
                                        <span className="song-artist">{song.artist}</span>
                                    </div>
                                    <span className="song-duration">{song.duration}</span>
                                </div>
                            )))}   
                        </div>
                    </div>
                ))) }
            </div>
        </div>
    )
}