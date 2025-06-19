import { Router } from 'express';
import {
  getAllAttributeValues,
  getAttributeValueById,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from '../attribute/attributeValueController.js';

const router = Router();

router.get('/', getAllAttributeValues);
router.get('/:id', getAttributeValueById);
router.post('/', createAttributeValue);
router.put('/:id', updateAttributeValue);
router.delete('/:id', deleteAttributeValue);

export default router;
