import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "AI Synthwave",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/neon/400/400"
  },
  {
    id: 2,
    title: "Cyber Pulse",
    artist: "Neural Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/cyber/400/400"
  },
  {
    id: 3,
    title: "Digital Rain",
    artist: "Virtual Lo-Fi",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/digital/400/400"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-3xl border border-pink-500/30 p-6 shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)]">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-2 border-pink-500/50 p-1 overflow-hidden"
          >
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full rounded-full object-cover grayscale brightness-75 contrast-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full border border-pink-500/50" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-mono font-bold text-white truncate drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {currentTrack.title}
          </h3>
          <p className="text-pink-400 font-mono text-sm uppercase tracking-widest opacity-80">
            {currentTrack.artist}
          </p>
          
          <div className="mt-4 flex items-center gap-4">
            <button onClick={prevTrack} className="text-gray-400 hover:text-pink-400 transition-colors">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white rounded-full hover:bg-pink-400 transition-all hover:scale-110 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
            <button onClick={nextTrack} className="text-gray-400 hover:text-pink-400 transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,1)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <span>01:42</span>
          <div className="flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            <span>Live Feed</span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-pink-500/60">
          <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
          <span className="uppercase tracking-tighter">Audio Engine v2.0</span>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [4, 12, 4] : 4 }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 bg-pink-500/40 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
