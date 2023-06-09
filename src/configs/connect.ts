import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect("mongodb+srv://Clinton:0000@clustering.48di9v7.mongodb.net/Mangaka")
    .then(() => console.log("Connected!"))
    .catch(() => {
      console.log("Not Connected!");
      process.exit(1);
    });
};
