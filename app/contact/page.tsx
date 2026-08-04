import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-300">
      {/* Cinematic Ambient Blur Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-12 flex justify-start">
          <Link href="/" className="inline-flex items-center text-[11px] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors font-bold group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </Link>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter">Get in touch.</h1>
        <p className="text-xl text-slate-400 mb-20 max-w-xl mx-auto font-light leading-relaxed">
          Have a question about a registrar, found a bug in our pricing data, or want to suggest a new feature? We'd love to hear from you.
        </p>
        
        <div className="flex flex-col space-y-6 max-w-xl mx-auto">
          <a href="mailto:hello@getyourdomain.example.com" className="group flex items-center justify-between p-6 bg-transparent border-b border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center space-x-6">
              <Mail className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <div className="text-left">
                <h3 className="text-white text-xl font-bold tracking-tight">Email</h3>
                <p className="text-sm text-slate-500 font-light mt-1">hello@getyourdomain.com</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-2 rotate-180 transition-all opacity-0 group-hover:opacity-100" />
          </a>
          
          <a href="#" className="group flex items-center justify-between p-6 bg-transparent border-b border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center space-x-6">
              <MessageCircle className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <div className="text-left">
                <h3 className="text-white text-xl font-bold tracking-tight">Twitter</h3>
                <p className="text-sm text-slate-500 font-light mt-1">@GetYourDomain</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-2 rotate-180 transition-all opacity-0 group-hover:opacity-100" />
          </a>
          
          <a href="https://github.com/Mohid59/GetYourDomain" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-6 bg-transparent border-b border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center space-x-6">
              <Terminal className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <div className="text-left">
                <h3 className="text-white text-xl font-bold tracking-tight">GitHub</h3>
                <p className="text-sm text-slate-500 font-light mt-1">Open an issue</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-2 rotate-180 transition-all opacity-0 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
}
