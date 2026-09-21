import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import College from '@/models/College';

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
    const colleges = await College.find({}).sort({ createdAt: -1 });
    return NextResponse.json(colleges, { headers: noCacheHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const college = new College(body);
    await college.save();

    revalidatePath('/');
    revalidatePath('/colleges');
    revalidatePath('/colleges/[id]', 'page');
    revalidatePath('/compare');
    revalidatePath('/admin/colleges');

    return NextResponse.json(college, { status: 201, headers: noCacheHeaders });
  } catch (error) {
    console.error('Error creating college:', error);
    return NextResponse.json(
      { error: 'Failed to create college' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400, headers: noCacheHeaders });
    }

    await College.findByIdAndDelete(id);

    revalidatePath('/');
    revalidatePath('/colleges');
    revalidatePath('/colleges/[id]', 'page');
    revalidatePath('/compare');
    revalidatePath('/admin/colleges');

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete college' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { documentId, ...updateData } = body;

    if (!documentId) {
      return NextResponse.json({ error: 'Missing documentId' }, { status: 400, headers: noCacheHeaders });
    }

    const updatedCollege = await College.findByIdAndUpdate(documentId, updateData, { new: true });

    revalidatePath('/');
    revalidatePath('/colleges');
    revalidatePath('/colleges/[id]', 'page');
    revalidatePath('/compare');
    revalidatePath('/admin/colleges');

    return NextResponse.json(updatedCollege, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json(
      { error: 'Failed to update college' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
