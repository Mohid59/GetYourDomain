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
    <div className="w-full max-w-5xl mx-auto my-16">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 px-4">
        <h3 className="font-extralight text-white text-2xl md:text-3xl tracking-tight">
          Pricing for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{domain}</span>
        </h3>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/80">Live Data</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Ranked by 3-Year TCO
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <th className="py-4 px-6 whitespace-nowrap font-medium">Registrar</th>
              <th className="py-4 px-6 whitespace-nowrap font-medium">1st Year</th>
              <th className="py-4 px-6 whitespace-nowrap font-medium">Renewal</th>
              <th className="py-4 px-6 whitespace-nowrap w-48 font-medium">3-Year TCO</th>
              <th className="py-4 px-6 whitespace-nowrap font-medium">Privacy</th>
              <th className="py-4 px-6 text-right whitespace-nowrap font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pricing.map((reg, idx) => {
              const isBestValue = reg.threeYearTCO === minTCO;
              const barWidth = Math.max(15, (reg.threeYearTCO / maxTCO) * 100);
              
              return (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, type: 'spring', stiffness: 50 }}
                  key={reg.id} 
                  className="group border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-500"
                >
                  <td className="py-6 px-6 font-medium text-white flex items-center space-x-3 whitespace-nowrap">
                    <span className={`text-xl font-bold tracking-tight ${isBestValue ? 'text-cyan-400' : 'text-slate-200'}`}>{reg.name}</span>
                    {isBestValue && (
                      <span className="text-[9px] text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest ml-3">
                        Top Pick
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-6 font-semibold text-slate-400 whitespace-nowrap">${reg.firstYearPrice.toFixed(2)}</td>
                  <td className={`py-6 px-6 whitespace-nowrap ${reg.renewalPrice > 18 ? 'text-rose-400/80 font-semibold' : 'text-slate-500'}`}>
                    ${reg.renewalPrice.toFixed(2)}<span className="text-xs text-slate-600 font-normal">/yr</span>
                  </td>
                  <td className="py-6 px-6 whitespace-nowrap w-48">
                    <div className="flex flex-col space-y-2">
                      <span className={`font-extrabold tracking-tight ${isBestValue ? 'text-cyan-400 text-xl' : 'text-white text-lg'}`}>
                        ${reg.threeYearTCO.toFixed(2)}
                      </span>
                      <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                          className={`h-full ${isBestValue ? 'bg-cyan-400' : 'bg-slate-600'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 whitespace-nowrap relative">
                    {reg.privacyFree ? (
                      <span className="inline-flex items-center text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                        <ShieldCheck className="w-4 h-4 mr-1.5 opacity-80"/> Included
                      </span>
                    ) : (
                      <div className="group/tooltip relative inline-flex">
                        <span className="inline-flex items-center cursor-help text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                          <X className="w-4 h-4 mr-1.5"/> Extra Fee
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-6 px-6 text-right whitespace-nowrap">
                    <a
                      href={reg.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-6 py-3 font-bold text-[11px] tracking-widest uppercase rounded-full transition-all duration-500 ${
                        isBestValue
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                          : 'bg-transparent hover:bg-white/10 text-slate-300 border border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      Select <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70"/>
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
