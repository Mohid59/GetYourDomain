'use client';

import { useState } from 'react';
import { Search, Loader2, Command } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (domain: string) => void;
  isLoading: boolean;
}

export default function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length >= 3) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto my-8 relative z-20">
      <div className={`relative flex items-center group transition-all duration-500 rounded-3xl ${isFocused ? 'shadow-[0_0_40px_rgba(59,130,246,0.3)]' : 'shadow-2xl'}`}>
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-blue-400' : 'text-slate-400'}`} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search domain (e.g. startup.com)..."
          className="w-full pl-16 pr-36 py-5 text-xl bg-white/10 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white placeholder:text-slate-400"
        />
        <div className="absolute right-3 flex items-center space-x-2">
          <div className="hidden sm:flex items-center px-2 py-1 bg-black/30 rounded border border-white/5 text-xs text-slate-400 font-mono">
            <Command className="w-3 h-3 mr-1"/> K
          </div>
          <button
            type="submit"
            disabled={isLoading || input.trim().length < 3}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 disabled:active:scale-100"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
}
