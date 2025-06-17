// controllers/productController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  const { name, description, sku, category_id, brand_id, isActive } = req.body;

  try {
    const data = await prisma.product.create({
      data: {
        name,
        description,
        sku,
        isActive,
        brand: brand_id ? { connect: { brand_id } } : undefined,
        category: category_id ? { connect: { category_id } } : undefined
      }
    });
    res.status(201).json({ success: true, message: "Created product", data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Creation failed", error: error.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      include: { sub_category: true, brand: true }
    });
    res.json({ success: true, message: "Fetched products", data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const data = await prisma.product.findUnique({
      where: { product_id: parseInt(req.params.id) },
      include: { sub_category: true, brand: true }
    });
    res.json({ success: true, message: "Fetched product", data });
  } catch (err) {
    res.status(404).json({ success: false, message: "Product not found", error: err.message });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const data = await prisma.product.update({
      where: { product_id: parseInt(req.params.id) },
      data: req.body
    });
    res.json({ success: true, message: "Updated product", data });
  } catch (err) {
    res.status(400).json({ success: false, message: "Update failed", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { product_id: parseInt(req.params.id) } });
    res.json({ success: true, message: "Deleted product" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Delete failed", error: err.message });
  }
};
