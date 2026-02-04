import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    actualPrice: {
      type: Number,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// 🔥 THIS LINE FIXES 500 ERRORS ON VERCEL
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
