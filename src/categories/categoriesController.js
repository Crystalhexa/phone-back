// controllers/categoryController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const data = await prisma.category.create({ data: req.body });
    res.status(201).json({ success: true, message: "Created category", data });
  } catch (err) {
    res.status(400).json({ success: false, message: "Creation failed", error: err.message });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const data = await prisma.category.findMany({ include: { subcategories: true } });
    res.json({ success: true, message: "Fetched categories", data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching categories", error: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const data = await prisma.category.findUnique({
      where: { category_id: parseInt(req.params.id) },
      include: { subcategories: true }
    });
    res.json({ success: true, message: "Fetched category", data });
  } catch (err) {
    res.status(404).json({ success: false, message: "Category not found", error: err.message });
  }
};



export const updateCategory = async (req, res) => {
  try {
    const data = await prisma.category.update({
      where: { category_id: parseInt(req.params.id) },
      data: req.body
    });
    res.json({ success: true, message: "Updated category", data });
  } catch (err) {
    res.status(400).json({ success: false, message: "Update failed", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({ where: { category_id: parseInt(req.params.id) } });
    res.json({ success: true, message: "Deleted category" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Delete failed", error: err.message });
  }
};
