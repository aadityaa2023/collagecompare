import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { courses as localCourses } from '@/data/courses';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET() {
  try {
    await dbConnect();
    let courses = await Course.find({}).sort({ name: 1 }).lean();
    if (!courses || courses.length === 0) {
      courses = localCourses.map((c) => ({
        ...c,
        slug: c.id,
      }));
    }
    return NextResponse.json(courses, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Failed to fetch courses from DB, using fallback:', error);
    const fallback = localCourses.map((c) => ({
      ...c,
      slug: c.id,
    }));
    return NextResponse.json(fallback, { headers: noCacheHeaders });
  }
}
