import mongoose from "mongoose"

export interface OrderType {
  _id: string
  email: string
  discordId: string
  items: {
    productId: mongoose.Types.ObjectId
    quantity: number
    price: number
    name: string
  }[]
  total: number
  status: string
  createdAt: Date
  paymentMethod: string
}

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  discordId: { type: String, required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: Number,
      price: Number,
      name: String,
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
})

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)