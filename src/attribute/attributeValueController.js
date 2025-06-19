import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createAttributeValue = async (req, res) => {
  try {
    const { value, attributeId } = req.body;
    const attributeValue = await prisma.attributeValue.create({
      data: { value, attributeId },
    });
    res.status(201).json(attributeValue);
  } catch (error) {
    console.error("Create AttributeValue Error:", error); // 👈 log it
    res.status(500).json({ error: 'Error creating attribute value', detail: error.message });
  }
};


// READ ALL
export const getAllAttributeValues = async (req, res) => {
  try {
    const attributeValues = await prisma.attributeValue.findMany({
      include: { attribute: true },
    });
    res.status(200).json(attributeValues);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving attribute values' });
  }
};

// READ ONE
export const getAttributeValueById = async (req, res) => {
  try {
    const { id } = req.params;
    const attributeValue = await prisma.attributeValue.findUnique({
      where: { id },
      include: { attribute: true },
    });
    if (!attributeValue) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(attributeValue);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving attribute value' });
  }
};

// UPDATE
export const updateAttributeValue = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, attributeId } = req.body;
    const attributeValue = await prisma.attributeValue.update({
      where: { id },
      data: { value, attributeId },
    });
    res.status(200).json(attributeValue);
  } catch (error) {
    res.status(500).json({ error: 'Error updating attribute value' });
  }
};

// DELETE
export const deleteAttributeValue = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.attributeValue.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attribute value' });
  }
};
