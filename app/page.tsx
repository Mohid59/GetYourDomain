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
      const res = await fetch(`/api/lookup?domain=${encodeURIComponent(domain)}`);
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
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* High-performance ambient glow using hardware-accelerated radial gradients (zero blur filter penalty) */}
      <div 
        className="ambient-glow absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] lg:w-[800px] h-[250px] sm:h-[400px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(8, 145, 178, 0.22) 0%, rgba(8, 145, 178, 0.06) 45%, transparent 70%)',
        }}
      />
      <div 
        className="ambient-glow absolute bottom-0 right-0 w-[280px] sm:w-[500px] lg:w-[600px] h-[250px] sm:h-[400px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.22) 0%, rgba(30, 58, 138, 0.05) 50%, transparent 70%)',
        }}
      />

      <main className="flex-grow py-10 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="mb-8 sm:mb-16"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 sm:mb-8">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-400/30 pb-1.5 sm:pb-2">Next-Gen Domain Search</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight sm:tracking-tighter text-white mb-4 sm:mb-8 break-words">
              GetYour<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Domain</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 sm:mt-6 text-base sm:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight px-1 sm:px-0">
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
            <div className="mt-4 max-w-3xl mx-auto flex flex-col items-center justify-center mb-8 sm:mb-12">
              <p className="text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 font-bold mb-4 sm:mb-6 text-center leading-relaxed px-2">
                Data Indexed from ICANN-Accredited Registrars • Last Verified: {lastVerifiedDate}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2.5 sm:gap-y-4 opacity-75 sm:opacity-50 sm:grayscale sm:hover:grayscale-0 sm:hover:opacity-100 transition-all duration-700">
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">Namecheap</div>
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">Porkbun</div>
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">Spaceship</div>
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">Cloudflare</div>
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">Hostinger</div>
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">Wix</div>
                <div className="text-xs sm:text-sm font-bold tracking-tight text-white/90">GoDaddy</div>
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
                className="mt-8 sm:mt-12 p-4 sm:p-6 bg-rose-950/20 border-l-2 border-rose-500 rounded-r-xl flex items-start sm:items-center text-left text-rose-200"
              >
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mr-3 sm:mr-5 flex-shrink-0 mt-0.5 sm:mt-0"/>
                <div>
                  <p className="font-bold text-lg sm:text-xl text-rose-300 tracking-tight">Oops! Something went wrong.</p>
                  <p className="text-xs sm:text-sm opacity-80 mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            {loading && !data && !error && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 sm:mt-12 w-full max-w-4xl mx-auto"
              >
                {/* High Fidelity Shimmer Skeleton - Mobile & Desktop responsive */}
                <div className="w-full bg-[#0a0a10] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none"></div>
                  
                  <div className="p-4 sm:p-6 bg-black/20 border-b border-white/10 flex justify-between items-center relative z-0">
                    <div className="h-5 sm:h-6 w-1/2 sm:w-1/3 bg-white/10 rounded-lg"></div>
                    <div className="h-5 sm:h-6 w-20 sm:w-32 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Mobile Skeleton Cards */}
                  <div className="block md:hidden p-4 space-y-4 relative z-0">
                    {[...Array(3)].map((_, i) => (
                      <div key={`mob-skel-${i}`} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="h-6 w-28 bg-white/10 rounded-md"></div>
                          <div className="h-5 w-16 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="h-14 bg-white/5 rounded-lg"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-10 bg-white/5 rounded-md"></div>
                          <div className="h-10 bg-white/5 rounded-md"></div>
                        </div>
                        <div className="h-10 bg-white/10 rounded-xl"></div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Skeleton Table */}
                  <div className="hidden md:block p-4 space-y-4 relative z-0">
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
                className="mt-8 sm:mt-12 text-left"
              >
                {data.isAvailable ? (
                  <div>
                    <div className="p-4 sm:p-8 bg-emerald-950/15 border-l-2 border-emerald-400 rounded-r-2xl flex items-start sm:items-center text-emerald-100 mb-8 sm:mb-12">
                      <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400 mr-3 sm:mr-6 flex-shrink-0 mt-0.5 sm:mt-0"/>
                      <div>
                        <p className="font-bold text-2xl sm:text-4xl tracking-tight break-all">{data.domain} is available!</p>
                        <p className="text-sm sm:text-lg text-emerald-400/80 mt-1 sm:mt-2 font-light tracking-tight">Select a registrar below to secure the best total cost.</p>
                      </div>
                    </div>
                    <RegistrarTable domain={data.domain} pricing={data.pricing}/>

                    {/* Post-Purchase Connect Guide Callout */}
                    <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 to-blue-950/20 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-bold text-sm sm:text-base">Ready to deploy your domain?</h4>
                          <p className="text-xs sm:text-sm text-slate-400">See 60-second copy-paste DNS guides for Vercel, Railway, Render, Netlify & more.</p>
                        </div>
                      </div>
                      <Link
                        href="/connect"
                        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 py-2.5 px-4 rounded-xl bg-cyan-400/10 border border-cyan-400/30 hover:bg-cyan-400/20 transition-all flex-shrink-0 w-full sm:w-auto justify-center"
                      >
                        Connect Guide →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="p-4 sm:p-8 bg-amber-950/15 border-l-2 border-amber-400 rounded-r-2xl flex items-start sm:items-center text-amber-100 mb-8 sm:mb-12">
                      <XCircle className="w-8 h-8 sm:w-12 sm:h-12 text-amber-400 mr-3 sm:mr-6 flex-shrink-0 mt-0.5 sm:mt-0"/>
                      <div>
                        <p className="font-bold text-2xl sm:text-4xl tracking-tight break-all">{data.domain} is taken.</p>
                        <p className="text-sm sm:text-lg text-amber-400/80 mt-1 sm:mt-2 font-light tracking-tight">Try one of the alternative brand suggestions below.</p>
                      </div>
                    </div>

                    {data.suggestions.length > 0 && (
                      <div className="p-4 sm:p-8 mt-4 border-t border-white/5">
                        <h4 className="font-bold text-white mb-4 sm:mb-6 flex items-center tracking-widest uppercase text-[10px] sm:text-[11px] text-amber-400/80">
                          <Zap className="w-4 h-4 mr-2"/>
                          Available Alternatives
                        </h4>
                        <div className="flex flex-wrap gap-2.5 sm:gap-4">
                          {data.suggestions.map((sug, i) => (
                            <motion.button
                              key={sug}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSearch(sug)}
                              className="px-4 py-2 sm:px-6 sm:py-3 bg-white/[0.03] sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 sm:border-b border-white/10 sm:border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 text-sm sm:text-lg font-light transition-all"
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
                className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left max-w-4xl mx-auto"
              >
                {[
                  { icon: Globe, title: "50+ Top TLDs", desc: "Search across the most popular domain extensions including .com, .net, .io, and more.", color: "text-cyan-400" },
                  { icon: ShieldCheck, title: "Hidden Fees Revealed", desc: "We factor in WHOIS privacy and high renewal rates so you know exactly what you'll pay.", color: "text-emerald-400" },
                  { icon: Info, title: "True 3-Year TCO", desc: "Don't get tricked by $0.99 promos. We rank by Total Cost of Ownership over 3 years.", color: "text-blue-400" },
                ].map((feat, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="p-6 sm:p-8 rounded-2xl sm:rounded-none bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 group relative"
                  >
                    <div className="hidden sm:block absolute top-0 left-8 w-8 h-px bg-white/20 group-hover:bg-cyan-400 group-hover:w-16 transition-all duration-500"></div>
                    <div className={`mb-4 sm:mt-6 sm:mb-6 ${feat.color}`}>
                      <feat.icon className="w-6 h-6 sm:w-8 sm:h-8"/>
                    </div>
                    <h3 className="font-bold text-white text-xl sm:text-2xl mb-2 sm:mb-3 tracking-tight">{feat.title}</h3>
                    <p className="text-slate-400 text-sm sm:text-lg font-light leading-relaxed tracking-tight">{feat.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 sm:py-12 mt-auto relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-center sm:text-left">
          <div className="text-slate-600 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} GetYourDomain. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/connect" className="text-cyan-400 hover:text-cyan-300 transition-colors py-1">Connect Domain</Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors py-1">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors py-1">Terms of Service</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors py-1">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
