import mongoose from "mongoose";

export interface OrderType {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    _id: string;
    name: string;
  }[];
  total: number;
  status: string;
  createdAt: Date;
}

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
