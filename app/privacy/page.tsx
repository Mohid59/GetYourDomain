import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-300">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>GetYourDomain ("we", "our", or "us") operates as a domain pricing comparison aggregator. We do not collect personally identifiable information (PII) from our visitors. Our service is completely free to use without requiring an account.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>The only data we process consists of the domain names you type into our search bar. This data is temporarily passed to our backend to query registrar APIs for availability and pricing. We do not store or log your search queries.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Affiliate Links & Third Parties</h2>
          <p>When you click a "Buy" button on our site, you are redirected to a third-party domain registrar (e.g., Namecheap, Porkbun). These links may contain affiliate tracking codes that help support our site at no additional cost to you. Once you leave our site, the privacy policies and terms of those respective registrars will apply.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Cookies</h2>
          <p>We do not use tracking cookies. However, the third-party registrars we link to may use cookies to track affiliate referrals and manage your session.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
        </div>
      </div>
    </div>
  );
}
