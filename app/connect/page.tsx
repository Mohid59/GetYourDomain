'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  ExternalLink, 
  Zap, 
  ShieldAlert, 
  HelpCircle, 
  Server, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';

interface DNSRecord {
  type: 'A' | 'CNAME' | 'ALIAS';
  name: string;
  value: string;
  ttl: string;
  purpose: string;
}

interface PlatformGuide {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badgeColor: string;
  docsUrl: string;
  steps: string[];
  records: DNSRecord[];
  proTip: string;
  redirectAdvice?: string;
}

const PLATFORMS: PlatformGuide[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Recommended for Next.js, React, Astro & Frontend Apps',
    category: 'Frontend / Fullstack',
    badgeColor: 'text-white border-white/20 bg-white/5',
    docsUrl: 'https://vercel.com/docs/projects/domains/add-a-domain',
    steps: [
      'In your Vercel Dashboard, select your project and click Settings → Domains.',
      'Enter your domain (e.g. yourdomain.com) and click Add.',
      'Log into your domain registrar (Namecheap, Porkbun, Cloudflare, etc.) and open DNS Management.',
      'Add the 2 DNS records shown below, then wait 2–10 minutes for Vercel to issue your free SSL certificate.'
    ],
    records: [
      {
        type: 'A',
        name: '@',
        value: '76.76.21.21',
        ttl: 'Automatic / 3600',
        purpose: 'Directs root domain (yourdomain.com) to Vercel edge network'
      },
      {
        type: 'CNAME',
        name: 'www',
        value: 'cname.vercel-dns.com',
        ttl: 'Automatic / 3600',
        purpose: 'Directs www.yourdomain.com to Vercel DNS'
      }
    ],
    proTip: 'Vercel will ask if you want to redirect www to root or root to www. Choose "Redirect to yourdomain.com" for standard SEO canonicalization.',
    redirectAdvice: 'Always configure both apex (@) and www so visitors never see a broken page.'
  },
  {
    id: 'railway',
    name: 'Railway',
    tagline: 'Recommended for Backends, APIs, Node, Python, Go & Docker',
    category: 'Backend / Containers',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    docsUrl: 'https://docs.railway.app/guides/public-networking#custom-domains',
    steps: [
      'In your Railway project canvas, click on your service box.',
      'Navigate to Settings → Public Networking → Custom Domain.',
      'Enter your domain (e.g. api.yourdomain.com or yourdomain.com).',
      'Railway will generate a unique CNAME target (e.g. your-app.up.railway.app). Add that CNAME in your registrar DNS.'
    ],
    records: [
      {
        type: 'CNAME',
        name: 'api (or www)',
        value: '<your-service>.up.railway.app',
        ttl: 'Automatic / 3600',
        purpose: 'Points your subdomain to your Railway container'
      },
      {
        type: 'ALIAS',
        name: '@',
        value: '<your-service>.up.railway.app',
        ttl: 'Automatic / 3600',
        purpose: 'For root apex domains (requires registrar CNAME flattening / ALIAS)'
      }
    ],
    proTip: 'If your registrar does not support ALIAS/ANAME at root (like basic GoDaddy), deploy on a subdomain (e.g. api.domain.com or www.domain.com) or use Cloudflare DNS for free CNAME flattening.',
  },
  {
    id: 'render',
    name: 'Render',
    tagline: 'Recommended for Web Services, APIs, Postgres & Background Workers',
    category: 'Cloud Hosting',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    docsUrl: 'https://render.com/docs/custom-domains',
    steps: [
      'In your Render Dashboard, go to your Web Service → Settings → Custom Domains.',
      'Click Add Custom Domain and enter your domain name.',
      'In your domain registrar DNS settings, add the A record for apex and CNAME record for www.',
      'Click Verify in Render. Render will automatically provision a Let’s Encrypt SSL certificate.'
    ],
    records: [
      {
        type: 'A',
        name: '@',
        value: '216.24.57.1',
        ttl: 'Automatic / 3600',
        purpose: 'Points apex root domain (yourdomain.com) to Render load balancer'
      },
      {
        type: 'CNAME',
        name: 'www',
        value: '<your-service-name>.onrender.com',
        ttl: 'Automatic / 3600',
        purpose: 'Points www.yourdomain.com to your Render service address'
      }
    ],
    proTip: 'If your registrar supports ANAME or ALIAS records, you can point @ directly to your <service>.onrender.com URL instead of using the IP.',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    tagline: 'Recommended for Jamstack, Static Sites & Modern Web Apps',
    category: 'Frontend Platform',
    badgeColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    docsUrl: 'https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/',
    steps: [
      'In your Netlify Dashboard, select your site and go to Site configuration → Domain management.',
      'Click Add domain and enter your custom domain name.',
      'In your registrar DNS console, create an A Record for apex (@) and a CNAME for www.',
      'Netlify will detect the records and automatically issue an HTTPS certificate.'
    ],
    records: [
      {
        type: 'A',
        name: '@',
        value: '75.2.60.5',
        ttl: 'Automatic / 3600',
        purpose: 'Directs root domain (yourdomain.com) to Netlify load balancer'
      },
      {
        type: 'CNAME',
        name: 'www',
        value: '<your-site-name>.netlify.app',
        ttl: 'Automatic / 3600',
        purpose: 'Directs www subdomain to your Netlify site URL'
      }
    ],
    proTip: 'Netlify automatically sets up a 301 redirect between your apex domain and www subdomain to preserve SEO rankings.',
  },
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    tagline: 'Recommended for Edge-Rendered Apps & Serverless Sites',
    category: 'Edge Network',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    docsUrl: 'https://developers.cloudflare.com/pages/configuration/custom-domains/',
    steps: [
      'In the Cloudflare Dashboard, go to Workers & Pages → select your Pages project.',
      'Click the Custom domains tab → Set up a custom domain.',
      'Enter your domain or subdomain.',
      'If your domain DNS is managed by Cloudflare, it configures automatically with 1 click. If external, add the CNAME record below.'
    ],
    records: [
      {
        type: 'CNAME',
        name: 'www (or @)',
        value: '<project-name>.pages.dev',
        ttl: 'Automatic / 3600',
        purpose: 'Points your domain to Cloudflare ultra-fast edge network'
      }
    ],
    proTip: 'If your domain is already using Cloudflare Nameservers, you never have to manually enter records; Cloudflare binds it instantly.',
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    tagline: 'Recommended for Open Source, Docs, Portfolios & Static Sites',
    category: 'Developer Hosting',
    badgeColor: 'text-slate-300 border-slate-600 bg-slate-800/40',
    docsUrl: 'https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site',
    steps: [
      'In your GitHub repository, go to Settings → Pages → Custom domain.',
      'Type your domain and click Save (this generates a CNAME file in your branch).',
      'At your registrar, create the 4 GitHub Pages A records and 1 CNAME record for www.',
      'Return to GitHub Pages settings and check "Enforce HTTPS" once DNS propagates.'
    ],
    records: [
      {
        type: 'A',
        name: '@',
        value: '185.199.108.153',
        ttl: 'Automatic / 3600',
        purpose: 'GitHub Pages Apex IP 1'
      },
      {
        type: 'A',
        name: '@',
        value: '185.199.109.153',
        ttl: 'Automatic / 3600',
        purpose: 'GitHub Pages Apex IP 2'
      },
      {
        type: 'A',
        name: '@',
        value: '185.199.110.153',
        ttl: 'Automatic / 3600',
        purpose: 'GitHub Pages Apex IP 3'
      },
      {
        type: 'A',
        name: '@',
        value: '185.199.111.153',
        ttl: 'Automatic / 3600',
        purpose: 'GitHub Pages Apex IP 4'
      },
      {
        type: 'CNAME',
        name: 'www',
        value: '<username>.github.io',
        ttl: 'Automatic / 3600',
        purpose: 'Points www subdomain to your GitHub user site'
      }
    ],
    proTip: 'Do not forget to check "Enforce HTTPS" in GitHub settings after DNS verifies, otherwise your site will default to insecure HTTP.',
  }
];

export default function ConnectDomainPage() {
  const [activeTab, setActiveTab] = useState('vercel');
  const [userDomain, setUserDomain] = useState('');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const currentPlatform = PLATFORMS.find(p => p.id === activeTab) || PLATFORMS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => {
      setCopiedValue(null);
    }, 2000);
  };

  const filteredPlatforms = PLATFORMS.filter(p => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const displayDomain = userDomain.trim() ? userDomain.trim() : 'yourdomain.com';

  return (
    <div className="min-h-screen py-10 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-300">
      {/* High-performance ambient glow using hardware-accelerated radial gradients (zero blur filter penalty) */}
      <div 
        className="ambient-glow absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] h-[300px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(8, 145, 178, 0.18) 0%, rgba(8, 145, 178, 0.04) 50%, transparent 70%)',
        }}
      />
      <div 
        className="ambient-glow absolute bottom-1/3 right-0 w-[280px] sm:w-[500px] h-[300px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0.03) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center text-[11px] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors font-bold group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Domain Search
          </Link>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 border border-white/10 px-2.5 py-1 rounded-full bg-white/[0.02]">
            Deployment Guides
          </span>
        </div>

        {/* Hero Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-400/30 pb-1">
              Zero-Ambiguity DNS Handbook
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight sm:tracking-tighter mb-4">
            Connect Your Domain.
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Bought a domain on Namecheap, Porkbun, or Spaceship? Here are the exact copy-paste DNS records and step-by-step instructions for every major deployment platform.
          </p>
        </div>

        {/* Optional Domain Customizer Field */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-white/[0.04] to-cyan-950/20 border border-white/10 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label htmlFor="custom-domain-input" className="text-xs uppercase font-bold tracking-widest text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Preview with your actual domain name:
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Type your domain to see personalized instructions and record names tailored for your site.
              </p>
            </div>
            <div className="w-full sm:w-72">
              <input
                id="custom-domain-input"
                type="text"
                value={userDomain}
                onChange={(e) => setUserDomain(e.target.value.toLowerCase().trim())}
                placeholder="e.g. acmeco.com"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-cyan-400 text-white placeholder:text-slate-600 text-sm focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Select Deployment Platform:
            </span>
            <div className="relative w-44 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter services..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filteredPlatforms.map((platform) => {
              const isSelected = activeTab === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all relative ${
                    isSelected 
                      ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border border-white/10'
                  }`}
                >
                  {platform.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Platform Guide Box */}
        <motion.div
          key={currentPlatform.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-3xl border border-white/10 bg-[#08080d] p-5 sm:p-8 mb-12 shadow-2xl relative overflow-hidden"
        >
          {/* Platform Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {currentPlatform.name}
                </h2>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${currentPlatform.badgeColor}`}>
                  {currentPlatform.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                {currentPlatform.tagline}
              </p>
            </div>
            <div>
              <a
                href={currentPlatform.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg border border-white/10 hover:border-cyan-400/40"
              >
                Official Docs <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Step by step simple instructions */}
          <div className="py-6 border-b border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Setup Steps (Under 2 Minutes)
            </h3>
            <ol className="space-y-3.5 text-sm sm:text-base leading-relaxed text-slate-200">
              {currentPlatform.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold flex items-center justify-center mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* DNS Records Table */}
          <div className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                Required DNS Records at Your Registrar
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Click any value to copy instantly
              </span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-white/10 bg-black/40">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Name / Host</th>
                    <th className="py-3 px-4">Value / Points To</th>
                    <th className="py-3 px-4">TTL</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {currentPlatform.records.map((rec, i) => {
                    const isCopied = copiedValue === rec.value;
                    const hostDisplay = rec.name === '@' ? `@ (${displayDomain})` : rec.name;
                    return (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-cyan-400">{rec.type}</td>
                        <td className="py-3.5 px-4 text-slate-200">{hostDisplay}</td>
                        <td className="py-3.5 px-4 text-emerald-300 font-semibold max-w-xs break-all">
                          {rec.value}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{rec.ttl}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleCopy(rec.value)}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-sans tracking-normal transition-colors border border-white/10 active:scale-95"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                                <span className="text-emerald-400 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                Copy Value
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block sm:hidden space-y-3">
              {currentPlatform.records.map((rec, i) => {
                const isCopied = copiedValue === rec.value;
                const hostDisplay = rec.name === '@' ? `@ (${displayDomain})` : rec.name;
                return (
                  <div key={i} className="p-4 rounded-xl border border-white/10 bg-black/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30">
                        {rec.type} Record
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">TTL: {rec.ttl}</span>
                    </div>

                    <div className="text-xs">
                      <div className="text-slate-500 uppercase text-[10px] font-bold">Host / Name:</div>
                      <div className="text-slate-200 font-mono mt-0.5">{hostDisplay}</div>
                    </div>

                    <div className="text-xs">
                      <div className="text-slate-500 uppercase text-[10px] font-bold">Value / Points To:</div>
                      <div className="text-emerald-300 font-mono mt-0.5 break-all font-semibold">{rec.value}</div>
                    </div>

                    <button
                      onClick={() => handleCopy(rec.value)}
                      className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-white/10 text-white text-xs font-semibold tracking-wide transition-colors border border-white/15 active:scale-95 mt-2"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                          <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          Copy Value
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ProTip Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed">
              <strong className="text-cyan-300 font-bold block mb-1">Crucial Tip for {currentPlatform.name}:</strong>
              {currentPlatform.proTip}
            </div>
          </div>
        </motion.div>

        {/* Global Gotchas & DNS Cheat Sheet Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            Universal DNS Rules & Common Gotchas
          </h3>
          <p className="text-sm text-slate-400 mb-8 max-w-2xl font-light">
            Avoid the 4 most common configuration mistakes developers make when setting up a new domain.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Globe className="w-4 h-4" />
                What does Host "@" mean?
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                The <code>@</code> symbol represents your root apex domain (e.g. <code>{displayDomain}</code>). In registrars like Namecheap, Porkbun, or Cloudflare, type <code>@</code> in the host field. If your registrar errors and says "@ is invalid", leave the host field completely blank.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Clock className="w-4 h-4" />
                How long does propagation take?
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Modern DNS changes usually propagate within <strong>2 to 15 minutes</strong>. If it is taking longer, you can check global propagation status for free on <a href="https://www.whatsmydns.net" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">whatsmydns.net</a>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldAlert className="w-4 h-4" />
                Cloudflare "Orange Cloud" SSL Error
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                If your domain DNS is managed in Cloudflare and pointing to Vercel, Railway, or Render, set the Proxy status to <strong>"DNS Only" (Grey Cloud)</strong> during initial verification so Let's Encrypt can issue the certificate without proxy interference.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Layers className="w-4 h-4" />
                Apex vs. Subdomain Routing
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Never delete your <code>www</code> CNAME record! Always set up both the root (<code>@</code>) and <code>www</code>, and allow your host (like Vercel or Render) to automatically redirect one to the other.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Search Again */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-500/20 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            Need another domain for your next project?
          </h3>
          <p className="text-sm text-slate-400 mb-6 font-light">
            Compare 3-year renewal costs across major registrars before you overpay.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
          >
            Search Another Domain <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
