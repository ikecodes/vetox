import { Schema, model, models } from "mongoose"
import slugify from "slugify"

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    nameSlug: String,
    categorySlug: String,
    subCategorySlug: String,
    images: [
      {
        publicId: String,
        original: String,
        thumbnail: String,
      },
    ],
    price: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    ratingsQuantity: Number,
    ratingsAverage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

//  virtural populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
})

productSchema.pre("save", function (next) {
  this.nameSlug = slugify(this.name)
  this.categorySlug = slugify(this.category)
  if (this.subCategory) {
    this.subCategorySlug = slugify(this.subCategory)
  }
  next()
})
const Product = models.Product || model("Product", productSchema)

export default Product
