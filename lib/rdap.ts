export async function checkDomainAvailability(sld: string, tld: string): Promise<boolean> {
  const fullDomain = `${sld}.${tld}`.toLowerCase();

  // Primary Check: DNS over HTTPS (DoH) via Cloudflare
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${fullDomain}&type=A`, {
      headers: { 'accept': 'application/dns-json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (dohRes.ok) {
      const dnsData = await dohRes.json();
      if (dnsData.Answer && dnsData.Answer.length > 0) {
        return false; // Domain exists and has DNS records -> TAKEN
      }
    }
  } catch (err: any) {
    // Fallback to RDAP
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
