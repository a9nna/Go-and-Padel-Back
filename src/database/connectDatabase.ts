import mongoose from "mongoose";

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);
  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const databaseConnection = await mongoose.connect(url);

  if (!databaseConnection) {
    throw new Error("Error while connecting to data base.");
  }
};

export default connectDatabase;
