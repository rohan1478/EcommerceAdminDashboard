import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  imageUrl: String, 
}, { timestamps: true });

export default model('Product', ProductSchema);
