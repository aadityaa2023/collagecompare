import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const folder = data.get("folder") || "uploads"; // default to uploads if not specified

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to prevent overwrites
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalExt = file.name.substring(file.name.lastIndexOf('.'));
    const safeFilename = `${file.name.replace(originalExt, '').replace(/[^a-zA-Z0-9]/g, '-')}-${uniqueSuffix}${originalExt}`;

    // Define path in the public directory
    const uploadDir = path.join(process.cwd(), "public", folder);
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    const filepath = path.join(uploadDir, safeFilename);

    // Write file to public directory
    await writeFile(filepath, buffer);

    // Return the public URL path
    return NextResponse.json({
      success: true,
      url: `/${folder}/${safeFilename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
