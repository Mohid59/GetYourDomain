import { NextRequest, NextResponse } from 'next/server';
import { checkDomainAvailability } from '@/lib/rdap';
import { getRegistrarPricing, generateAlternativeSuggestions } from '@/lib/pricingEngine';
import { DomainSearchResponse } from '@/types/domain';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('domain');

  if (!query) {
    return NextResponse.json({ error: 'Domain query parameter required' }, { status: 400 });
  }

  let cleaned = query.trim().toLowerCase();
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, '');
  cleaned = cleaned.replace(/\/.*$/, '');

  const parts = cleaned.split('.');
  const sld = parts[0];
  const tld = parts.length > 1 ? parts.slice(1).join('.') : 'com';
  const fullDomain = `${sld}.${tld}`;

  if (!sld || sld.length < 1) {
    return NextResponse.json({ error: 'Invalid domain name' }, { status: 400 });
  }

  try {
    const isAvailable = await checkDomainAvailability(sld, tld);
    const pricing = isAvailable ? getRegistrarPricing(fullDomain, tld) : [];
    const suggestions = !isAvailable ? await generateAlternativeSuggestions(sld, tld) : [];

    const response: DomainSearchResponse = {
      domain: fullDomain,
      sld,
      tld,
      isAvailable,
      searchedAt: new Date().toISOString(),
      pricing,
      suggestions
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to process domain lookup', details: err.message }, { status: 500 });
  }
}
