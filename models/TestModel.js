import { Schema, model, models } from "mongoose";

const testModelSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Test = models.Test || model("Test", testModelSchema);

export default Test;
