import Link from 'next/link';
import { ArrowLeft, Mail, Twitter, Github } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-300">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl text-center">
        <div className="mb-8 flex justify-start">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-tight">Contact Us</h1>
        <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto">
          Have a question about a registrar, found a bug in our pricing data, or want to suggest a new feature? We'd love to hear from you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="mailto:hello@getyourdomain.example.com" className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col items-center">
            <Mail className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-sm text-slate-400">hello@getyourdomain.com</p>
          </a>
          
          <a href="#" className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col items-center">
            <Twitter className="w-8 h-8 text-sky-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-2">Twitter</h3>
            <p className="text-sm text-slate-400">@GetYourDomain</p>
          </a>
          
          <a href="https://github.com/Mohid59/GetYourDomain" target="_blank" rel="noopener noreferrer" className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col items-center">
            <Github className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-2">GitHub</h3>
            <p className="text-sm text-slate-400">Open an issue</p>
          </a>
        </div>
      </div>
    </div>
  );
}
