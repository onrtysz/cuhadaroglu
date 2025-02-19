import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Category, ICategory } from "./models/category.model";
import { Product, IProduct } from "./models/product.model";

const app = express();

// parse request body as JSON for middleware
app.use(express.json());

// MongoDB connections
mongoose
  .connect("mongodb://localhost:27017/cuhadaroglu", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/*
  API for listing products:
  GET /products?page=1&limit=5&search=SHOES&category=categoryId

  - Listing : page and limit
  - Filter : search and category
*/
app.get("/products", async (req: Request, res: Response) => {
  try {
    const { page, limit, search, category } = req.query;
    const pageForQuery = parseInt(page as string) || 1;
    const limitForQuery = parseInt(limit as string) || 5;
    const categoryId = (category as string) || null;

    const filter: any = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (categoryId) {
      filter.category = categoryId;
    }

    const skip = (pageForQuery - 1) * limitForQuery;

    const products = await Product.aggregate([
      { $match: filter },

      { $skip: skip },

      { $limit: limitForQuery },

      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },

      { $unwind: "$categoryInfo" },

      {
        $project: {
          name: 1,
          price: 1,
          category: "$categoryInfo.name",
        },
      },
    ]).exec();
    const total = await Product.countDocuments(filter);

    res.json({
      page,
      limit,
      total,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching products", error: error });
  }
});

/*
  API for adding a product:
  POST /products
  Expected JSON: { name, price, categoryId }
*/
app.post("/products", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, price, categoryId } = req.body;
    if (!name || !price || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, price and categoryId are required." });
    }

    const category: ICategory | null = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found with given id." });
    }

    const product: IProduct = new Product({
      name,
      price,
      category: categoryId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while adding product", error });
  }
});

/*
 API for listing categories:
  GET /categories
*/
app.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching categories", error: error });
  }
});

/*
  API for adding a category:
  POST /categories
    Expected JSON: { name }
*/
app.post("/categories", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error while adding category", error });
  }
});

// Server listening on PORT 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
