import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import College from '@/models/College';

export async function GET() {
  try {
    await dbConnect();
    const colleges = await College.find({}).sort({ createdAt: -1 });
    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const college = new College(body);
    await college.save();

    return NextResponse.json(college, { status: 201 });
  } catch (error) {
    console.error('Error creating college:', error);
    return NextResponse.json(
      { error: 'Failed to create college' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await College.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete college' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { documentId, ...updateData } = body;

    if (!documentId) {
      return NextResponse.json({ error: 'Missing documentId' }, { status: 400 });
    }

    const updatedCollege = await College.findByIdAndUpdate(documentId, updateData, { new: true });
    return NextResponse.json(updatedCollege);
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json(
      { error: 'Failed to update college' },
      { status: 500 }
    );
  }
}
