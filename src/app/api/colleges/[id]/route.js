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
  const searchName = (c.name || '').toLowerCase();
  const searchShort = (c.shortName || '').toLowerCase();
  const localMatch = localColleges.find(
    (lc) =>
      (c.id && lc.id === c.id) ||
      (searchName && lc.name.toLowerCase() === searchName) ||
      (searchShort && lc.shortName && lc.shortName.toLowerCase() === searchShort) ||
      (searchName.includes('lovely') && lc.name.toLowerCase().includes('lpu')) ||
      (searchShort.includes('lpu') && lc.name.toLowerCase().includes('lpu'))
  );

  const loc = typeof c.location === 'string'
    ? { city: c.location.split(',')[0]?.trim() || 'Online', state: c.location.split(',')[1]?.trim() || 'India' }
    : (c.location?.city ? c.location : (localMatch?.location || { city: 'Online', state: 'India' }));

  return {
    ...(localMatch || {}),
    ...c,
    _id: c._id ? c._id.toString() : undefined,
    id: c.id || localMatch?.id || (c._id ? c._id.toString() : ''),
    name: c.name || localMatch?.name,
    shortName: c.shortName || localMatch?.shortName || c.name,
    location: loc,
    type: c.type || localMatch?.type || 'Private',
    established: c.established || localMatch?.established,
    nirfRanking: c.nirfRanking ?? localMatch?.nirfRanking,
    naacGrade: c.naacGrade || localMatch?.naacGrade || 'A',
    logo: c.logo || c.image || localMatch?.logo || '',
    campus: c.campus || localMatch?.campus || '/campus-placeholder.jpg',
    fees: (c.fees && typeof c.fees === 'object' && Object.keys(c.fees).length > 0) ? c.fees : (localMatch?.fees || {}),
    coursesOffered: (Array.isArray(c.coursesOffered) && c.coursesOffered.length > 0) 
      ? c.coursesOffered 
      : (Array.isArray(c.courses) && c.courses.length > 0 ? c.courses : (localMatch?.coursesOffered || [])),
    avgPackage: typeof c.avgPackage === 'number' && c.avgPackage > 0 ? c.avgPackage : (parseFloat(c.avgPackage || c.placements?.average || 0) || localMatch?.avgPackage || 0),
    highestPackage: typeof c.highestPackage === 'number' && c.highestPackage > 0 ? c.highestPackage : (parseFloat(c.highestPackage || c.placements?.highest || 0) || localMatch?.highestPackage || 0),
    about: c.about || localMatch?.about || '',
    topRecruiters: (Array.isArray(c.topRecruiters) && c.topRecruiters.length > 0) ? c.topRecruiters : (localMatch?.topRecruiters || []),
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
