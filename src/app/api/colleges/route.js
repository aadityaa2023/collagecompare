import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import College from '@/models/College';
import { colleges as localColleges } from '@/data/colleges';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

const normalizeCollege = (c) => {
  const loc = typeof c.location === 'string'
    ? { city: c.location.split(',')[0]?.trim() || 'Online', state: c.location.split(',')[1]?.trim() || 'India' }
    : (c.location || { city: 'Online', state: 'India' });

  return {
    ...c,
    _id: c._id ? c._id.toString() : undefined,
    id: c.id || (c._id ? c._id.toString() : ''),
    shortName: c.shortName || c.name,
    location: loc,
    logo: c.logo || c.image || '',
    coursesOffered: c.coursesOffered || c.courses || [],
    avgPackage: typeof c.avgPackage === 'number' ? c.avgPackage : parseFloat(c.avgPackage || c.placements?.average || 0) || 0,
    highestPackage: typeof c.highestPackage === 'number' ? c.highestPackage : parseFloat(c.highestPackage || c.placements?.highest || 0) || 0,
  };
};

export async function GET() {
  try {
    await dbConnect();
    let colleges = await College.find({}).sort({ createdAt: -1 }).lean();

    if (!colleges || colleges.length === 0) {
      colleges = localColleges;
    }

    const normalized = colleges.map(normalizeCollege);
    return NextResponse.json(normalized, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Failed to fetch colleges from DB, using fallback:', error);
    return NextResponse.json(localColleges.map(normalizeCollege), { headers: noCacheHeaders });
  }
}
