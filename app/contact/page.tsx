import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-12 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-300">
      {/* High-performance ambient glow using hardware-accelerated radial gradients */}
      <div 
        className="ambient-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-[280px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.18) 0%, rgba(30, 58, 138, 0.04) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 sm:mb-12 flex justify-start">
          <Link href="/" className="inline-flex items-center text-[11px] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors font-bold group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </Link>
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-8 tracking-tight sm:tracking-tighter">Get in touch.</h1>
        <p className="text-base sm:text-xl text-slate-400 mb-10 sm:mb-20 max-w-xl mx-auto font-light leading-relaxed px-2">
          Have a question about a registrar, found a bug in our pricing data, or want to suggest a new feature? We'd love to hear from you.
        </p>
        
        <div className="flex flex-col space-y-4 sm:space-y-6 max-w-xl mx-auto text-left">
          <a href="mailto:hello@getyourdomain.example.com" className="group flex items-center justify-between p-4 sm:p-6 bg-white/[0.02] sm:bg-transparent rounded-xl sm:rounded-none border sm:border-0 border-white/5 sm:border-b sm:border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <div>
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">Email</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5 sm:mt-1">hello@getyourdomain.com</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 rotate-180 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </a>
          
          <a href="#" className="group flex items-center justify-between p-4 sm:p-6 bg-white/[0.02] sm:bg-transparent rounded-xl sm:rounded-none border sm:border-0 border-white/5 sm:border-b sm:border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <div>
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">Twitter</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5 sm:mt-1">@GetYourDomain</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 rotate-180 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </a>
          
          <a href="https://github.com/Mohid59/GetYourDomain" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 sm:p-6 bg-white/[0.02] sm:bg-transparent rounded-xl sm:rounded-none border sm:border-0 border-white/5 sm:border-b sm:border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <div>
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">GitHub</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5 sm:mt-1">Open an issue</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 rotate-180 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
