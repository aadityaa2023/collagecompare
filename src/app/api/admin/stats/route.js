import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import College from '@/models/College';
import Course from '@/models/Course';

export async function GET() {
  try {
    await dbConnect();

    const [leads, colleges, courses] = await Promise.all([
      Lead.countDocuments(),
      College.countDocuments(),
      Course.countDocuments(),
    ]);

    return NextResponse.json({
      leads,
      colleges,
      courses,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
