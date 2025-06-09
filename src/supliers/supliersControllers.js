// suppliersController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Supplier (with uniqueness check by name or email or phone)
export const createSupplier = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Check if a supplier with same name, email, or phone exists
    const existingSupplier = await prisma.supplier.findFirst({
      where: {
        OR: [
          { name: name },
          { email: email },
          { phone: phone }
        ]
      }
    });

    if (existingSupplier) {
      return res.status(400).json({
        message: 'Supplier already exists with the same name, email, or phone'
      });
    }

    // Create new supplier
    const supplier = await prisma.supplier.create({
      data: req.body,
    });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error creating supplier', error });
  }
};

// Get All Suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving suppliers', error });
  }
};

// Get Supplier by ID
export const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { supplier_id: parseInt(id) },
    });
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier', error });
  }
};

// Update Supplier
export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { supplier_id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier', error });
  }
};

// Delete Supplier
export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.supplier.delete({
      where: { supplier_id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error });
  }
};
