import { Schema, model, models } from "mongoose"

const cartSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      select: false,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
)

cartSchema.pre(/^find/, function (next) {
  this.populate("product")
  next()
})

const Cart = models.Cart || model("Cart", cartSchema)

export default Cart
