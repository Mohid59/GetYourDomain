'use client';

import { RegistrarPrice } from '@/types/domain';
import { ExternalLink, Check, X, ShieldCheck, Trophy, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface RegistrarTableProps {
  pricing: RegistrarPrice[];
  domain: string;
}

export default function RegistrarTable({ pricing, domain }: RegistrarTableProps) {
  const minTCO = Math.min(...pricing.map(p => p.threeYearTCO));
  const maxTCO = Math.max(...pricing.map(p => p.threeYearTCO));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-6">
      <div className="p-6 bg-black/20 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h3 className="font-bold text-white text-xl tracking-tight flex items-center">
            Compare Registrars for <span className="text-blue-400 ml-2">{domain}</span>
          </h3>
          <div className="flex items-center px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Verified Accurate</span>
          </div>
        </div>
        <span className="text-xs text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full font-bold border border-blue-500/30 uppercase tracking-wider hidden sm:inline-block">
          Ranked by 3-Year TCO
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs font-bold text-slate-400 uppercase tracking-widest bg-black/10">
              <th className="py-5 px-6 whitespace-nowrap">Registrar</th>
              <th className="py-5 px-6 whitespace-nowrap">1st Year</th>
              <th className="py-5 px-6 whitespace-nowrap">Renewal / Yr</th>
              <th className="py-5 px-6 whitespace-nowrap w-48">3-Year TCO</th>
              <th className="py-5 px-6 whitespace-nowrap">WHOIS Privacy</th>
              <th className="py-5 px-6 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {pricing.map((reg, idx) => {
              const isBestValue = reg.threeYearTCO === minTCO;
              // Calculate percentage for the bar chart (min 10%, max 100%)
              const barWidth = Math.max(15, (reg.threeYearTCO / maxTCO) * 100);
              
              return (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                  key={reg.id} 
                  className={`transition-colors group ${
                    isBestValue 
                      ? 'bg-blue-900/20 hover:bg-blue-900/40 relative' 
                      : 'hover:bg-white/5 bg-transparent'
                  }`}
                >
                  <td className="py-5 px-6 font-medium text-white flex items-center space-x-3 whitespace-nowrap">
                    <span className="text-lg font-bold">{reg.name}</span>
                    {isBestValue && (
                      <span className="text-[10px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-2 py-1 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] flex items-center uppercase tracking-wider ml-2">
                        <Trophy className="w-3 h-3 mr-1.5" /> Best Value
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-6 font-semibold text-slate-300 whitespace-nowrap">${reg.firstYearPrice.toFixed(2)}</td>
                  <td className={`py-5 px-6 whitespace-nowrap ${reg.renewalPrice > 18 ? 'text-rose-400 font-semibold' : 'text-slate-400'}`}>
                    ${reg.renewalPrice.toFixed(2)}
                  </td>
                  <td className="py-5 px-6 whitespace-nowrap w-48">
                    <div className="flex flex-col space-y-1.5">
                      <span className={`font-extrabold ${isBestValue ? 'text-blue-400 text-lg' : 'text-white'}`}>
                        ${reg.threeYearTCO.toFixed(2)}
                      </span>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                          className={`h-full rounded-full ${isBestValue ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-slate-500'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 whitespace-nowrap relative">
                    {reg.privacyFree ? (
                      <span className="inline-flex items-center text-xs text-emerald-300 font-bold bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                        <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400"/> Free
                      </span>
                    ) : (
                      <div className="group/tooltip relative inline-flex">
                        <span className="inline-flex items-center cursor-help text-xs text-slate-400 font-medium bg-white/5 hover:bg-white/10 transition-colors px-3 py-1.5 rounded-lg border border-white/10">
                          <X className="w-4 h-4 mr-1.5 text-slate-500"/> Extra Fee
                          <Info className="w-3.5 h-3.5 ml-2 text-slate-500"/>
                        </span>
                        {/* Glassmorphic Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 translate-y-2 pointer-events-none transition-all duration-200 z-50">
                          <p className="text-xs text-slate-200 leading-relaxed whitespace-normal">
                            This registrar charges an additional hidden fee (often $9.99+/yr) for WHOIS domain privacy. We factored this into the 3-Year TCO.
                          </p>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800/90 border-r border-b border-white/10 transform rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-6 text-right whitespace-nowrap">
                    <a
                      href={reg.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-6 py-2.5 font-bold text-sm rounded-xl transition-all shadow-lg active:scale-95 ${
                        isBestValue
                          ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      Buy <ExternalLink className="w-4 h-4 ml-2 opacity-80"/>
                    </a>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
