import { Schema, model, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: Schema.Types.ObjectId; 
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);
