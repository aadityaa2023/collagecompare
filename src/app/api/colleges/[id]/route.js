import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import College from '@/models/College';
import { colleges as localColleges, getCollegeById } from '@/data/colleges';

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

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'College id is required' },
        { status: 400, headers: noCacheHeaders }
      );
    }

    let college = null;

    try {
      await dbConnect();
      const queries = [
        { id: id },
        { id: id.toLowerCase() },
      ];
      if (mongoose.Types.ObjectId.isValid(id)) {
        queries.push({ _id: id });
      }

      college = await College.findOne({ $or: queries }).lean();
    } catch (dbErr) {
      console.error('Database query error in /api/colleges/[id]:', dbErr);
    }

    if (!college) {
      const fallback = getCollegeById(id) || localColleges.find(
        (c) => c.id?.toLowerCase() === id.toLowerCase()
      );
      if (fallback) {
        college = fallback;
      }
    }

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404, headers: noCacheHeaders }
      );
    }

    return NextResponse.json(normalizeCollege(college), { headers: noCacheHeaders });
  } catch (error) {
    console.error('Failed to fetch college:', error);
    return NextResponse.json(
      { error: 'Failed to fetch college' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
