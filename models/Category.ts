import mongoose from "mongoose"

export interface CategoryType {
  _id: string
  name: string
  description?: string
  slug: string
  parent?: { _id: string; name: string } | string 
}


const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Category || mongoose.model("Category", CategorySchema)

