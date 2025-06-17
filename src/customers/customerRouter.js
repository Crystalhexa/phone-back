import express from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../customers/customerController.js';

const router = express.Router();

// Create
router.post('/', createCustomer);

// Read All
router.get('/', getAllCustomers);

// Read One
router.get('/:id', getCustomerById);

// Update
router.put('/:id', updateCustomer);

// Delete
router.delete('/:id', deleteCustomer);

export default router;
