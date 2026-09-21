import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { colleges as fileCols } from '../src/data/colleges.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function migrate() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const dbCols = await mongoose.connection.db.collection('colleges').find().toArray();
  console.log(`Found ${dbCols.length} colleges in MongoDB.`);

  for (const c of dbCols) {
    const match = fileCols.find(
      (fc) =>
        fc.name.toLowerCase().includes(c.name.toLowerCase()) ||
        c.name.toLowerCase().includes(fc.name.toLowerCase())
    ) || {};

    const slug =
      c.id ||
      match.id ||
      c.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const shortName = c.shortName || match.shortName || c.name;
    const logo = c.logo || c.image || match.logo || '';
    const campus = c.campus || match.campus || '/campus-placeholder.jpg';
    const about = c.about || match.about || `${c.name} is a leading higher education institution.`;

    const loc =
      typeof c.location === 'object' && c.location.city
        ? c.location
        : match.location || {
            city: typeof c.location === 'string' ? c.location.split(',')[0].trim() : 'Online',
            state: 'India',
          };

    const nirfRanking =
      c.nirfRanking ||
      match.nirfRanking ||
      (c.rankings?.[0] ? parseInt(c.rankings[0].replace(/\D/g, '')) : undefined);

    const naacGrade = c.naacGrade || match.naacGrade || 'A';
    const avgPkg =
      typeof c.avgPackage === 'number'
        ? c.avgPackage
        : match.avgPackage || parseFloat(c.placements?.average || 0) || 0;

    const highPkg =
      typeof c.highestPackage === 'number'
        ? c.highestPackage
        : match.highestPackage || parseFloat(c.placements?.highest || 0) || 0;

    const coursesOffered =
      c.coursesOffered && c.coursesOffered.length > 0
        ? c.coursesOffered
        : match.coursesOffered || c.courses || [];

    const recruiters =
      c.topRecruiters && c.topRecruiters.length > 0
        ? c.topRecruiters
        : match.topRecruiters || c.placements?.topRecruiters || [];

    const fees =
      c.fees && typeof c.fees === 'object' && Object.keys(c.fees).length > 0
        ? c.fees
        : match.fees || {};

    await mongoose.connection.db.collection('colleges').updateOne(
      { _id: c._id },
      {
        $set: {
          id: slug,
          shortName,
          logo,
          campus,
          about,
          location: loc,
          nirfRanking,
          naacGrade,
          avgPackage: avgPkg,
          highestPackage: highPkg,
          coursesOffered,
          topRecruiters: recruiters,
          fees,
        },
      }
    );
  }

  // Insert any missing colleges from fileCols
  for (const fc of fileCols) {
    const existing = await mongoose.connection.db.collection('colleges').findOne({
      $or: [{ id: fc.id }, { name: fc.name }]
    });
    if (!existing) {
      console.log('Inserting missing college:', fc.name);
      await mongoose.connection.db.collection('colleges').insertOne({
        ...fc,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  const finalCount = await mongoose.connection.db.collection('colleges').countDocuments();
  console.log(`Migration complete! Total colleges in database: ${finalCount}`);
  process.exit(0);
}

migrate().catch((e) => {
  console.error('Migration error:', e);
  process.exit(1);
});
