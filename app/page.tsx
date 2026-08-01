'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import SearchBox from '@/components/SearchBox';
import RegistrarTable from '@/components/RegistrarTable';
import { DomainSearchResponse } from '@/types/domain';
import { CheckCircle2, XCircle, Info, ShieldCheck, Zap, Globe, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DomainSearchResponse | null>(null);

  const handleSearch = async (domain: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/search?domain=${encodeURIComponent(domain)}`);
      if (!res.ok) {
        throw new Error('Failed to fetch domain information.');
      }
      const result: DomainSearchResponse = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="mb-12"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Next-Gen Domain Search</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              GetYour<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Domain</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Stop overpaying for renewals. Compare real domain costs across major registrars and find the true 3-year price instantly.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.5, stiffness: 100 }}
          >
            <SearchBox isLoading={loading} onSearch={handleSearch}/>
            
            {/* Legitimate Trust Signal Banner */}
            <div className="mt-8 pt-8 border-t border-white/10 max-w-2xl mx-auto flex flex-col items-center justify-center opacity-70 mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">Real-time data indexed from top ICANN-accredited registrars</p>
              <div className="flex items-center justify-center space-x-6 sm:space-x-10 grayscale opacity-70">
                <div className="text-sm font-bold text-slate-300">Namecheap</div>
                <div className="text-sm font-bold text-slate-300">Porkbun</div>
                <div className="text-sm font-bold text-slate-300">Spaceship</div>
                <div className="text-sm font-bold text-slate-300">Cloudflare</div>
                <div className="text-sm font-bold text-slate-300">GoDaddy</div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8 p-5 bg-rose-500/10 border border-rose-500/20 backdrop-blur-xl rounded-2xl flex items-center text-left text-rose-200"
              >
                <AlertTriangle className="w-6 h-6 text-rose-400 mr-4 flex-shrink-0"/>
                <div>
                  <p className="font-bold text-lg text-rose-300">Oops! Something went wrong.</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
              </motion.div>
            )}

            {loading && !data && !error && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 w-full max-w-4xl mx-auto"
              >
                {/* High Fidelity Shimmer Skeleton */}
                <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>
                  <div className="p-6 bg-black/20 border-b border-white/10 flex justify-between items-center relative z-0">
                    <div className="h-6 w-1/3 bg-white/10 rounded-lg"></div>
                    <div className="h-6 w-32 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="p-4 space-y-4 relative z-0">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
                        <div className="h-6 w-32 bg-white/10 rounded-lg"></div>
                        <div className="h-5 w-16 bg-white/10 rounded-lg"></div>
                        <div className="h-5 w-16 bg-white/10 rounded-lg"></div>
                        <div className="flex flex-col space-y-2 w-32">
                          <div className="h-5 w-24 bg-white/10 rounded-lg"></div>
                          <div className="h-2 w-full bg-white/10 rounded-full"></div>
                        </div>
                        <div className="h-5 w-20 bg-white/10 rounded-lg"></div>
                        <div className="h-10 w-24 bg-white/10 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {data && !loading && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                className="mt-12 text-left"
              >
                {data.isAvailable ? (
                  <div>
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl rounded-2xl flex items-center text-emerald-100 mb-8 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mr-5 flex-shrink-0"/>
                      <div>
                        <p className="font-extrabold text-2xl tracking-tight">{data.domain} is available!</p>
                        <p className="text-sm text-emerald-300/80 mt-1">Select a registrar below to secure the best total cost.</p>
                      </div>
                    </div>
                    <RegistrarTable domain={data.domain} pricing={data.pricing}/>
                  </div>
                ) : (
                  <div>
                    <div className="p-6 bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl rounded-2xl flex items-center text-amber-100 mb-8 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                      <XCircle className="w-10 h-10 text-amber-400 mr-5 flex-shrink-0"/>
                      <div>
                        <p className="font-extrabold text-2xl tracking-tight">{data.domain} is taken.</p>
                        <p className="text-sm text-amber-300/80 mt-1">Try one of the alternative brand suggestions below.</p>
                      </div>
                    </div>

                    {data.suggestions.length > 0 && (
                      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center tracking-tight">
                          <Zap className="w-6 h-6 text-amber-400 mr-3"/>
                          Available Alternatives
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {data.suggestions.map((sug, i) => (
                            <motion.button
                              key={sug}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59,130,246,0.2)', borderColor: 'rgba(59,130,246,0.5)' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSearch(sug)}
                              className="px-5 py-2.5 bg-white/5 border border-white/10 text-blue-100 rounded-xl text-sm font-semibold transition-colors shadow-lg"
                            >
                              {sug}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {!data && !loading && !error && (
              <motion.div 
                key="features"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto"
              >
                {[
                  { icon: Globe, title: "50+ Top TLDs", desc: "Search across the most popular domain extensions including .com, .net, .io, and more.", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: ShieldCheck, title: "Hidden Fees Revealed", desc: "We factor in WHOIS privacy and high renewal rates so you know exactly what you'll pay.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { icon: Info, title: "True 3-Year TCO", desc: "Don't get tricked by $0.99 promos. We rank by Total Cost of Ownership over 3 years.", color: "text-purple-400", bg: "bg-purple-500/10" },
                ].map((feat, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className={`w-14 h-14 ${feat.bg} rounded-2xl flex items-center justify-center mb-6 ${feat.color} shadow-inner`}>
                      <feat.icon className="w-7 h-7"/>
                    </div>
                    <h3 className="font-bold text-white text-xl mb-3 tracking-tight">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8 mt-auto relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} GetYourDomain. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
