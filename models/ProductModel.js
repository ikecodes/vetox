import { Schema, model, models } from "mongoose"

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "A product must have a category"],
    },
    photo: {
      type: "String",
      required: [true, "A product must have a photo"],
    },
    public_id: {
      type: "String",
      required: [true, "A product must have a public id"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Product = models.Product || model("Product", productSchema)

export default Product
