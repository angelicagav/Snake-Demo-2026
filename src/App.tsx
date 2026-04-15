import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Music, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-6 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-mono font-black tracking-tighter uppercase leading-none">
                Neon<span className="text-cyan-400">Snake</span>
              </h1>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Arcade Edition v1.0</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-cyan-400 pb-1">Terminal</a>
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Leaderboard</a>
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Settings</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-gray-400 uppercase">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sidebar - Info/Stats */}
        <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest mb-4 text-cyan-400">
              <Gamepad2 className="w-4 h-4" />
              How to Play
            </h2>
            <ul className="space-y-3 text-sm text-gray-400 font-mono">
              <li className="flex gap-3">
                <span className="text-cyan-500">01.</span>
                Use arrow keys to navigate the snake.
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-500">02.</span>
                Eat the pink neon bits to grow.
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-500">03.</span>
                Don't hit yourself or the walls!
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest mb-4 text-pink-400">
              <Music className="w-4 h-4" />
              Now Playing
            </h2>
            <MusicPlayer />
          </section>
        </div>

        {/* Center - Game Window */}
        <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
          <SnakeGame />
        </div>

        {/* Right Sidebar - Social/Meta */}
        <div className="lg:col-span-3 space-y-8 order-3">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Zap className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-lg font-mono font-bold mb-2">PRO MODE</h3>
            <p className="text-xs text-gray-400 font-mono mb-4 leading-relaxed">
              Unlock higher speeds and exclusive neon skins by reaching 500 points.
            </p>
            <button className="w-full py-2 bg-white text-black text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors">
              Upgrade Now
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] px-2">Active Sessions</h4>
            {[
              { user: "CyberPunk_99", score: 1240 },
              { user: "NeonGhost", score: 980 },
              { user: "SynthWave", score: 850 },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10" />
                  <span className="text-xs font-mono text-gray-300">{session.user}</span>
                </div>
                <span className="text-xs font-mono text-cyan-400">{session.score}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              &copy; 2026 NEON ARCADE SYSTEMS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              BUILT FOR THE GRID. POWERED BY NEURAL SYNTH.
            </p>
          </div>
          <div className="flex gap-6">
            {['Twitter', 'Discord', 'GitHub'].map((link) => (
              <a key={link} href="#" className="text-[10px] font-mono text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
