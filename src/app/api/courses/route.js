import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { courses as localCourses } from '@/data/courses';

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
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Failed to fetch courses from DB, using fallback:', error);
    const fallback = localCourses.map((c) => ({
      ...c,
      slug: c.id,
    }));
    return NextResponse.json(fallback);
  }
}
