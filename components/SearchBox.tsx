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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto my-12 relative z-20 group">
      <div className={`relative flex items-center transition-all duration-700 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <Search className={`w-8 h-8 transition-colors duration-500 ${isFocused ? 'text-cyan-400' : 'text-slate-600'}`} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a domain"
          className="w-full pl-14 pr-32 py-6 text-3xl md:text-5xl font-extralight bg-transparent border-b border-white/10 focus:outline-none focus:border-cyan-400/60 transition-all text-white placeholder:text-slate-800 tracking-tight"
        />
        <div className="absolute right-0 flex items-center space-x-4">
          <div className="hidden sm:flex items-center px-2 py-1 text-[10px] text-slate-700 font-mono tracking-widest uppercase">
            <Command className="w-3 h-3 mr-1"/> K
          </div>
          <button
            type="submit"
            disabled={isLoading || input.trim().length < 3}
            className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
              isLoading || input.trim().length < 3 
                ? 'bg-transparent text-slate-800 border border-slate-800/50' 
                : 'bg-white text-black hover:bg-cyan-400 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Search className="w-5 h-5"/>}
          </button>
        </div>
      </div>
    </form>
  );
}
