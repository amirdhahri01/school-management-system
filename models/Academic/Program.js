import mongoose from "mongoose";

const Schema = mongoose.Schema;

const programSchema = new Schema(
  {
    name: {
      type: Strnig,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
      default: "4 years",
    },
    //Created Automatically
    code: {
      type: String,
      default: function () {
        return (
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase() +
          Math.floor(Math.random() * 90 + 10) +
          Math.floor(Math.random() * 90 + 10)
        );
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    //We will push the teachers that are in charge of the program
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: [],
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    //We will push the subjects that are in the program when the program is created
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", programSchema);

export default Program;
