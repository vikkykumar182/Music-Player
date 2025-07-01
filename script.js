const songs = [
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    src: "song1.mp3",
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    src: "song2.mp3",
  },
  {
    title: "Love Me Like You Do",
    artist: "Ellie Goulding",
    src: "song3.mp3",
  },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");

let currentSongIndex = 0;

// Load song
function loadSong(song) {
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updatePlaylist();
}

// Play or pause
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

// Update progress bar
function updateProgressBar() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percentage}%`;
  updateTime();
}

// Update time
function updateTime() {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, "0");

  currentTimeEl.textContent = `${minutes}:${seconds}`;
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
}

// Skip to next/prev
function skipSong(direction) {
  currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playBtn.textContent = "⏸️";
}

// Update volume
function updateVolume() {
  audio.volume = volumeControl.value;
}

// Populate playlist
function populatePlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
      currentSongIndex = index;
      loadSong(song);
      audio.play();
      playBtn.textContent = "⏸️";
    };
    playlistEl.appendChild(li);
  });
}

// Update playlist highlight
function updatePlaylist() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentSongIndex);
  });
}

// Event listeners
playBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", () => skipSong(-1));
nextBtn.addEventListener("click", () => skipSong(1));
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", () => skipSong(1));
volumeControl.addEventListener("input", updateVolume);

// Initialize
populatePlaylist();
loadSong(songs[currentSongIndex]);
