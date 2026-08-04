import { RegistrarPrice } from '@/types/domain';
import { checkDomainAvailability } from '@/lib/rdap';

interface TldRates {
  [tld: string]: {
    [registrarId: string]: {
      firstYear: number;
      renewal: number;
      privacyFree: boolean;
    };
  };
}

const REGISTRARS = [
  { id: 'porkbun', name: 'Porkbun', baseUrl: 'https://porkbun.com/checkout/search?q=' },
  { id: 'spaceship', name: 'Spaceship', baseUrl: 'https://www.spaceship.com/domain-search/?query=' },
  { id: 'namecheap', name: 'Namecheap', baseUrl: 'https://www.namecheap.com/domains/registration/results/?domain=' },
  { id: 'hostinger', name: 'Hostinger', baseUrl: 'https://www.hostinger.com/domain-name-results?domain=' },
  { id: 'godaddy', name: 'GoDaddy', baseUrl: 'https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=' },
  { id: 'cloudflare', name: 'Cloudflare', baseUrl: 'https://www.cloudflare.com/products/registrar/' },
  { id: 'wix', name: 'Wix', baseUrl: 'https://www.wix.com/domain/result/?q=' }
];

import pricingData from '@/public/data/pricing.json';

const PRICING_MATRIX: TldRates = pricingData.rates;

export function getRegistrarPricing(fullDomain: string, tld: string): RegistrarPrice[] {
  const normalizedTld = PRICING_MATRIX[tld] ? tld : 'com';
  const rates = PRICING_MATRIX[normalizedTld];

  const results: RegistrarPrice[] = REGISTRARS.map((reg) => {
    const pricing = rates[reg.id] || rates['porkbun'];
    const threeYearTCO = parseFloat((pricing.firstYear + pricing.renewal * 2).toFixed(2));

      let affiliateUrl = `${reg.baseUrl}${fullDomain}${reg.baseUrl.includes('?') ? '&' : '?'}aff=getyourdomain_tag`;
      if (reg.id === 'godaddy') {
        affiliateUrl = `${reg.baseUrl}${fullDomain}`;
      } else if (reg.id === 'cloudflare') {
        affiliateUrl = reg.baseUrl;
      }

      return {
        id: reg.id,
        name: reg.name,
        logoUrl: `/logos/${reg.id}.svg`,
        firstYearPrice: pricing.firstYear,
        renewalPrice: pricing.renewal,
        threeYearTCO,
        privacyFree: pricing.privacyFree,
        affiliateUrl
      };
  });

  results.sort((a, b) => a.threeYearTCO - b.threeYearTCO);

  if (results.length > 0) {
    results[0].badge = 'Lowest 3-Year Cost';
  }

  return results;
}

export async function generateAlternativeSuggestions(sld: string, currentTld: string): Promise<string[]> {
  const prefixes = ['get', 'try', 'use', 'app', 'hub', 'my', 'the', 'go'];
  const tldList = ['com', 'io', 'co', 'net', 'ai', 'app'].filter(t => t !== currentTld);
  
  const potential: {sld: string, tld: string, full: string}[] = [];

  prefixes.forEach(prefix => {
    potential.push({ sld: `${prefix}${sld}`, tld: currentTld, full: `${prefix}${sld}.${currentTld}` });
  });

  tldList.forEach(altTld => {
    potential.push({ sld, tld: altTld, full: `${sld}.${altTld}` });
  });

  // Check availability concurrently for up to 12 domains to ensure we get some hits
  const checkPromises = potential.slice(0, 12).map(async (domain) => {
    try {
      const isAvailable = await checkDomainAvailability(domain.sld, domain.tld);
      return { full: domain.full, isAvailable };
    } catch {
      return { full: domain.full, isAvailable: false };
    }
  });

  const results = await Promise.all(checkPromises);
  const availableSuggestions = results.filter(res => res.isAvailable).map(res => res.full);

  return availableSuggestions.slice(0, 5);
}
