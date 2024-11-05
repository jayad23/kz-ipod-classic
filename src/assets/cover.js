import { v4 } from "uuid";
const mockSongs = [
  "I'm like a bird",
  "Turn off the light",
  "Powerless",
  "Promiscuous",
  "Maneater",
  "Say it right",
  "All good things",
  "In god's hands",
  "Try",
];
export const albums = [
  {
    id: 1,
    album_title: "Loose",
    artist: "Nelly Furtado",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/5/55/Loose_%28Nelly_Furtado_album_-_cover_art%29.png",
    songs: mockSongs.map((song) => ({
      id: v4(),
      title: song,
      duration: "4:04",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    })),
  },
  {
    id: 2,
    album_title: "Lo mejor de Juanes",
    artist: "Juanes",
    cover: "https://i.scdn.co/image/ab67616d00001e020384733667e5e8d61c11ec14",
    songs: [
      {
        id: v4(),
        title: "Afraid",
        duration: "4:04",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
  },
  {
    id: 3,
    album_title: "Shape & Destroy",
    artist: "Ruston Kelly",
    cover:
      "https://m.media-amazon.com/images/I/71nKXv2gdCL._UF1000,1000_QL80_.jpg",
    songs: [
      {
        id: v4(),
        title: "Afraid",
        duration: "4:04",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
  },
  {
    id: 4,
    album_title: "Legend",
    artist: "Bob Marley & The Wailers",
    cover: "https://i.scdn.co/image/ab67616d0000b2733dad91f4a796045ac25496f3",
    songs: [
      {
        id: v4(),
        title: "Afraid",
        duration: "4:04",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
  },
  {
    id: 5,
    album_title: "All eyes on me",
    artist: "2Pac",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/16/Alleyezonme.jpg",
    songs: [
      {
        id: v4(),
        title: "Afraid",
        duration: "4:04",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
  },
];
