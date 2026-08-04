'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import RegistrarTable from '@/components/RegistrarTable';
import { DomainSearchResponse } from '@/types/domain';
import { CheckCircle2, XCircle, Info, ShieldCheck, Zap, Globe, AlertTriangle } from 'lucide-react';

import pricingData from '@/public/data/pricing.json';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DomainSearchResponse | null>(null);

  const lastVerifiedDate = new Date(pricingData.lastUpdated).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

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
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Cinematic Ambient Blur Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/30 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      <main className="flex-grow py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="inline-block mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-400/30 pb-2">Next-Gen Domain Search</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-white mb-8">
              GetYour<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Domain</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
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
            <div className="mt-4 max-w-3xl mx-auto flex flex-col items-center justify-center opacity-70 mb-12">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-6 text-center">Data Indexed from ICANN-Accredited Registrars • Last Verified: {lastVerifiedDate}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="text-sm font-bold tracking-tight text-white">Namecheap</div>
                <div className="text-sm font-bold tracking-tight text-white">Porkbun</div>
                <div className="text-sm font-bold tracking-tight text-white">Spaceship</div>
                <div className="text-sm font-bold tracking-tight text-white">Cloudflare</div>
                <div className="text-sm font-bold tracking-tight text-white">Hostinger</div>
                <div className="text-sm font-bold tracking-tight text-white">Wix</div>
                <div className="text-sm font-bold tracking-tight text-white">GoDaddy</div>
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
                className="mt-12 p-6 bg-transparent border-l-2 border-rose-500 flex items-center text-left text-rose-200"
              >
                <AlertTriangle className="w-8 h-8 text-rose-400 mr-5 flex-shrink-0"/>
                <div>
                  <p className="font-bold text-xl text-rose-300 tracking-tight">Oops! Something went wrong.</p>
                  <p className="text-sm opacity-80 mt-1">{error}</p>
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
                    <div className="p-8 bg-transparent border-l-2 border-emerald-400 flex items-center text-emerald-100 mb-12">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mr-6 flex-shrink-0"/>
                      <div>
                        <p className="font-bold text-4xl tracking-tighter">{data.domain} is available!</p>
                        <p className="text-lg text-emerald-400/80 mt-2 font-light tracking-tight">Select a registrar below to secure the best total cost.</p>
                      </div>
                    </div>
                    <RegistrarTable domain={data.domain} pricing={data.pricing}/>
                  </div>
                ) : (
                  <div>
                    <div className="p-8 bg-transparent border-l-2 border-amber-400 flex items-center text-amber-100 mb-12">
                      <XCircle className="w-12 h-12 text-amber-400 mr-6 flex-shrink-0"/>
                      <div>
                        <p className="font-bold text-4xl tracking-tighter">{data.domain} is taken.</p>
                        <p className="text-lg text-amber-400/80 mt-2 font-light tracking-tight">Try one of the alternative brand suggestions below.</p>
                      </div>
                    </div>

                    {data.suggestions.length > 0 && (
                      <div className="p-8 mt-4 border-t border-white/5">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center tracking-widest uppercase text-[11px] text-amber-400/80">
                          <Zap className="w-4 h-4 mr-2"/>
                          Available Alternatives
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {data.suggestions.map((sug, i) => (
                            <motion.button
                              key={sug}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSearch(sug)}
                              className="px-6 py-3 bg-transparent border-b border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 text-lg font-light transition-colors"
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
                  { icon: Globe, title: "50+ Top TLDs", desc: "Search across the most popular domain extensions including .com, .net, .io, and more.", color: "text-cyan-400" },
                  { icon: ShieldCheck, title: "Hidden Fees Revealed", desc: "We factor in WHOIS privacy and high renewal rates so you know exactly what you'll pay.", color: "text-emerald-400" },
                  { icon: Info, title: "True 3-Year TCO", desc: "Don't get tricked by $0.99 promos. We rank by Total Cost of Ownership over 3 years.", color: "text-blue-400" },
                ].map((feat, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="p-8 group relative"
                  >
                    <div className="absolute top-0 left-8 w-8 h-px bg-white/20 group-hover:bg-cyan-400 group-hover:w-16 transition-all duration-500"></div>
                    <div className={`mt-6 mb-6 ${feat.color}`}>
                      <feat.icon className="w-8 h-8"/>
                    </div>
                    <h3 className="font-bold text-white text-2xl mb-3 tracking-tight">{feat.title}</h3>
                    <p className="text-slate-400 text-lg font-light leading-relaxed tracking-tight">{feat.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 mt-auto relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-slate-600 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} GetYourDomain. All rights reserved.
          </div>
          <div className="flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
