// controllers/subcategoryController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createSubCategory = async (req, res) => {
  try {
    const data = await prisma.subCategory.create({ data: req.body });
    res.status(201).json({ success: true, message: "Created subcategory", data });
  } catch (err) {
    res.status(400).json({ success: false, message: "Creation failed", error: err.message });
  }
};
export const getAllSubCategories = async (req, res) => {
  try {
    const data = await prisma.subCategory.findMany({
      include: { category: true, products: true }
    });
    res.json({ success: true, message: "Fetched subcategories", data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching subcategories", error: err.message });
  }
};

export const getSubCategoryById = async (req, res) => {
  try {
    const data = await prisma.subCategory.findUnique({
      where: { subcategory_id: parseInt(req.params.id) },
      include: { category: true, products: true }
    });
    res.json({ success: true, message: "Fetched subcategory", data });
  } catch (err) {
    res.status(404).json({ success: false, message: "Subcategory not found", error: err.message });
  }
};



export const updateSubCategory = async (req, res) => {
  try {
    const data = await prisma.subCategory.update({
      where: { subcategory_id: parseInt(req.params.id) },
      data: req.body
    });
    res.json({ success: true, message: "Updated subcategory", data });
  } catch (err) {
    res.status(400).json({ success: false, message: "Update failed", error: err.message });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    await prisma.subCategory.delete({ where: { subcategory_id: parseInt(req.params.id) } });
    res.json({ success: true, message: "Deleted subcategory" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Delete failed", error: err.message });
  }
};
