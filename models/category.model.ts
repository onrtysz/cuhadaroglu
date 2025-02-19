import { Schema, model, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const Category: Model<ICategory> = model<ICategory>('Category', CategorySchema);
