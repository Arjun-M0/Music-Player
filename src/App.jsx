import { MusicPlayer } from "./components/MusicPlayer"
import { Allsongs } from "./components/Allsongs"
import { Playlist } from "./components/Playlist"
import { BrowserRouter, Route , Routes } from "react-router"  
import { MusicProvider } from "./Contexts/MusicContext"
import { Navbar } from "./components/navbar"

function App() {

  return (
    <BrowserRouter>
    <MusicProvider>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <div className="player-section">
            <MusicPlayer />
          </div>
          <div className="content-section">
            <Routes>
              <Route path="/" element={<Allsongs />} />
              <Route path="/playlist" element={<Playlist />} />
            </Routes>
          </div>
        </main>
      </div>
    </MusicProvider>
    </BrowserRouter>
  )
}

export default App
