import { Router } from 'express';
import {
  getAllAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from '../attribute/attributeController.js';

const router = Router();

router.get('/', getAllAttributes);
router.get('/:id', getAttributeById);
router.post('/', createAttribute);
router.put('/:id', updateAttribute);
router.delete('/:id', deleteAttribute);

export default router;
