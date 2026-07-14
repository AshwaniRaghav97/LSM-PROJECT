import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],

    // Last watched lecture
    lastLecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      default: null,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.index(
  {
    user: 1,
    course: 1,
  },
  {
    unique: true,
  }
);

const Progress = mongoose.model(
  "Progress",
  progressSchema
);

export default Progress;