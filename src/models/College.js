import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    fees: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    established: { type: String },
    image: { type: String },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    features: [{ type: String }],
    rankings: [{ type: String }],
    placements: {
      highest: { type: String },
      average: { type: String },
      topRecruiters: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.College || mongoose.model('College', collegeSchema);
