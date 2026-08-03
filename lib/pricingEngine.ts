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
  { id: 'hostinger', name: 'Hostinger', baseUrl: 'https://www.hostinger.com/domain-name-search?domain=' },
  { id: 'godaddy', name: 'GoDaddy', baseUrl: 'https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=' },
  { id: 'cloudflare', name: 'Cloudflare', baseUrl: 'https://www.cloudflare.com/products/registrar/' },
  { id: 'wix', name: 'Wix', baseUrl: 'https://www.wix.com/domain/names/search?query=' }
];

const PRICING_MATRIX: TldRates = {
  com: {
    porkbun: { firstYear: 10.37, renewal: 10.37, privacyFree: true },
    spaceship: { firstYear: 8.48, renewal: 9.98, privacyFree: true },
    namecheap: { firstYear: 6.79, renewal: 14.98, privacyFree: true },
    hostinger: { firstYear: 2.99, renewal: 19.99, privacyFree: true },
    godaddy: { firstYear: 0.99, renewal: 22.99, privacyFree: false },
    cloudflare: { firstYear: 9.77, renewal: 9.77, privacyFree: true },
    wix: { firstYear: 9.90, renewal: 14.95, privacyFree: false }
  },
  net: {
    porkbun: { firstYear: 11.48, renewal: 11.48, privacyFree: true },
    spaceship: { firstYear: 9.98, renewal: 11.98, privacyFree: true },
    namecheap: { firstYear: 11.98, renewal: 15.98, privacyFree: true },
    hostinger: { firstYear: 4.99, renewal: 21.99, privacyFree: true },
    godaddy: { firstYear: 14.99, renewal: 24.99, privacyFree: false },
    cloudflare: { firstYear: 11.20, renewal: 11.20, privacyFree: true },
    wix: { firstYear: 9.90, renewal: 14.95, privacyFree: false }
  },
  org: {
    porkbun: { firstYear: 10.37, renewal: 10.37, privacyFree: true },
    spaceship: { firstYear: 8.88, renewal: 10.88, privacyFree: true },
    namecheap: { firstYear: 8.98, renewal: 14.98, privacyFree: true },
    hostinger: { firstYear: 4.99, renewal: 21.99, privacyFree: true },
    godaddy: { firstYear: 9.99, renewal: 22.99, privacyFree: false },
    cloudflare: { firstYear: 9.95, renewal: 9.95, privacyFree: true },
    wix: { firstYear: 9.90, renewal: 14.95, privacyFree: false }
  },
  io: {
    porkbun: { firstYear: 39.54, renewal: 39.54, privacyFree: true },
    spaceship: { firstYear: 28.98, renewal: 32.98, privacyFree: true },
    namecheap: { firstYear: 32.98, renewal: 39.98, privacyFree: true },
    hostinger: { firstYear: 39.99, renewal: 49.99, privacyFree: true },
    godaddy: { firstYear: 39.99, renewal: 59.99, privacyFree: false },
    cloudflare: { firstYear: 42.00, renewal: 42.00, privacyFree: true },
    wix: { firstYear: 29.90, renewal: 39.90, privacyFree: false }
  }
};

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
