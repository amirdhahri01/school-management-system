import mongoose from "mongoose";

const Schema = Schema;

const ClassLevelSchema = new Schema(
  {
    //level100/200/300/400
    name: {
      type: String, 
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    //students will be added to the class level when they are registered
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    //optional.
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);

export default ClassLevel