import mongoose from "mongoose"

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  features: string[];
  stock: number;
  deliveryEstimate: string;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  features: [String],
  stock: { type: Number, required: true },
  deliveryEstimate: { type: String, default: "1-2 days" },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
