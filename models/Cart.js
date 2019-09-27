import mongoose from "mongoose";
const { String } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    name: { type: String }
  },
  { timestamps: true }
  
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);


