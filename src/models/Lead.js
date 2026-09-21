import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      default: 'Not specified',
    },
    preferredCourse: {
      type: String,
      default: 'General Counselling',
    },
    answersSummary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

// If the model exists, use it. Otherwise, create it.
export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
