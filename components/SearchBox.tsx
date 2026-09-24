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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto my-8 sm:my-12 relative z-20 group">
      <div className={`relative flex items-center transition-all duration-500 ${isFocused ? 'scale-[1.01] sm:scale-[1.02]' : 'scale-100'}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <Search className={`w-5 h-5 sm:w-8 sm:h-8 transition-colors duration-500 ${isFocused ? 'text-cyan-400' : 'text-slate-600'}`} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search domain (e.g. acme.com)"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="w-full pl-9 sm:pl-14 pr-14 sm:pr-32 py-4 sm:py-6 text-xl sm:text-3xl md:text-5xl font-extralight bg-transparent border-b border-white/10 focus:outline-none focus:border-cyan-400/60 transition-all text-white placeholder:text-slate-700 tracking-tight"
        />
        <div className="absolute right-0 flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center px-2 py-1 text-[10px] text-slate-700 font-mono tracking-widest uppercase">
            <Command className="w-3 h-3 mr-1"/> K
          </div>
          <button
            type="submit"
            aria-label="Search domain"
            disabled={isLoading || input.trim().length < 3}
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
              isLoading || input.trim().length < 3 
                ? 'bg-transparent text-slate-700 border border-slate-800' 
                : 'bg-white text-black hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'
            }`}
          >
            {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"/> : <Search className="w-4 h-4 sm:w-5 sm:h-5"/>}
          </button>
        </div>
      </div>
    </form>
  );
}
