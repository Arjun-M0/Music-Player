# React Music Player

A sleek and modern music player application built with React and Vite. This project demonstrates core React concepts including hooks (`useState`, `useEffect`, `useRef`, `useContext`), state management with the Context API, and handling of HTML5 audio.

## ✨ Key Features

- **Complete Audio Controls**: Play, pause, skip to the next or previous track.
- **Interactive Progress Bar**: Seek to any point in the track by clicking or dragging the progress bar.
- **Volume Control**: Adjust the playback volume with a dedicated slider.
- **Dynamic Playlist**: View all available songs, see which one is currently playing, and select any song to play it instantly.
- **Active Song Highlighting**: The currently playing song is highlighted in the playlist.
- **Autoplay**: Automatically plays the next song when the current one finishes.
- **Responsive Design**: A clean and modern UI that works on different screen sizes.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: React Context API
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: Plain CSS with modern techniques.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Project Structure

/
├── public/
│   └── songs/        # MP3 files are stored here
├── src/
│   ├── components/   # React components (MusicPlayer, Allsongs, etc.)
│   ├── Contexts/     # React Context for global state (MusicContext)
│   ├── hooks/        # Custom hooks (useMusic)
│   ├── App.jsx       # Main application component with routing
│   ├── main.jsx      # Entry point of the React application
│   └── index.css     # Global styles
├── package.json
└── README.md
