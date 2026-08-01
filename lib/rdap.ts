import dns from 'dns';

export async function checkDomainAvailability(sld: string, tld: string): Promise<boolean> {
  const fullDomain = `${sld}.${tld}`.toLowerCase();

  // Primary Check: DNS Lookup
  try {
    const addresses = await dns.promises.resolve4(fullDomain);
    if (addresses && addresses.length > 0) {
      return false; // Domain exists and is pointing to IPs -> TAKEN
    }
  } catch (err: any) {
    if (err.code !== 'ENOTFOUND' && err.code !== 'NODATA') {
      // Unexpected error, continue to RDAP fallback
    }
  }

  // Secondary Check: Public RDAP Protocol with 3s Timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const rdapUrl = tld === 'com' || tld === 'net' 
      ? `https://rdap.verisign.com/com/v1/domain/${fullDomain}`
      : `https://rdap.org/domain/${fullDomain}`;

    const res = await fetch(rdapUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.status === 200) return false; // Found in RDAP registry -> TAKEN
    if (res.status === 404) return true;  // Not found -> AVAILABLE
  } catch (error) {
    // If RDAP times out or fails, default to DNS check result
    return true; 
  }

  return true;
}
