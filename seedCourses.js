import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { courses } from './src/data/courses.js';
import Course from './src/models/Course.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

async function seedCourses() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses.');

    // Insert new courses
    const coursesToInsert = courses.map((c) => ({
      name: c.name,
      shortName: c.shortName,
      level: c.level,
      duration: c.duration,
      avgFees: c.avgFees,
      image: c.image,
      description: c.description,
      category: "Engineering", // default if missing
      slug: c.id,
      topColleges: c.topColleges || [],
      eligibilityExams: c.eligibilityExams || [],
      subjects: c.subjects || [],
      careers: c.careers || [],
    }));

    await Course.insertMany(coursesToInsert);
    console.log(`Successfully seeded ${coursesToInsert.length} courses!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();
