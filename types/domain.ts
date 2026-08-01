export interface RegistrarPrice {
  id: string;
  name: string;
  logoUrl: string;
  firstYearPrice: number;
  renewalPrice: number;
  threeYearTCO: number;
  privacyFree: boolean;
  affiliateUrl: string;
  badge?: string;
}

export interface DomainSearchResponse {
  domain: string;
  sld: string;
  tld: string;
  isAvailable: boolean;
  searchedAt: string;
  pricing: RegistrarPrice[];
  suggestions: string[];
  error?: string;
}
