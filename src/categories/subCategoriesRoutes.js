import express from 'express';
import {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory
} from '../categories/subCategoriesController.js';

const router = express.Router();

router.get('/', getAllSubCategories);
router.get('/:id', getSubCategoryById);
router.post('/', createSubCategory);
router.put('/:id', updateSubCategory);
router.delete('/:id', deleteSubCategory);

export default router;
