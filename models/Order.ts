import mongoose, { Schema, type Document } from "mongoose";
import { Key } from "react";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDocument extends Document {
  _id: Key | null | undefined;
  stripeSessionId: string;
  userId: string | null;
  email: string;
  discordId: string | null;
  userName: string | null;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    stripeSessionId: { type: String, required: true, unique: true },
    userId: { type: String, default: null },
    email: { type: String, required: true },
    discordId: { type: String, default: null },
    userName: { type: String, default: null },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    shippingAddress: {
      name: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<OrderDocument>("Order", OrderSchema);
