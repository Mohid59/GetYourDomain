import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-300">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[11px] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors mb-12 font-bold group">
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Search
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tighter">Terms of Service.</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using GetYourDomain (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
          <p>GetYourDomain provides a search engine and pricing comparison tool for domain names. We do not sell domains directly. We simply aggregate pricing information from ICANN-accredited registrars.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Accuracy of Information</h2>
          <p>While we strive to keep pricing information as accurate and up-to-date as possible, we cannot guarantee that the prices displayed will exactly match the final price at checkout on the registrar's website. Registrars may change prices, add taxes, or apply specific geographical restrictions at any time.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Affiliate Disclaimer</h2>
          <p>GetYourDomain participates in various affiliate marketing programs. When you click on links to registrars and make a purchase, this can result in a commission that is credited to this site.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p>GetYourDomain shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from the use or inability to use the Service, or from any purchases made on third-party sites accessed through the Service.</p>
        </div>
      </div>
    </div>
  );
}
