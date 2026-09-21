import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true }, // e.g., 'UG', 'PG'
    duration: { type: String, required: true },
    description: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
