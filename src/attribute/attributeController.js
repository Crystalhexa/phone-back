import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all attributes
export const getAllAttributes = async (req, res) => {
  try {
    const attributes = await prisma.attribute.findMany({
      include: { values: true },
    });
    res.json(attributes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attributes.' });
  }
};

// Get one attribute
export const getAttributeById = async (req, res) => {
  const { id } = req.params;
  try {
    const attribute = await prisma.attribute.findUnique({
      where: { id },
      include: { values: true },
    });
    if (!attribute) return res.status(404).json({ error: 'Attribute not found.' });
    res.json(attribute);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attribute.' });
  }
};

// Create attribute
export const createAttribute = async (req, res) => {
  const { name } = req.body;
  try {
    const newAttribute = await prisma.attribute.create({ data: { name } });
    res.status(201).json(newAttribute);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create attribute.' });
  }
};

// Update attribute
export const updateAttribute = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedAttribute = await prisma.attribute.update({
      where: { id },
      data: { name },
    });
    res.json(updatedAttribute);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update attribute.' });
  }
};

// Delete attribute
export const deleteAttribute = async (req, res,) => {
  const { id } = req.params;
  try {
    await prisma.attribute.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete attribute.' });
  }
};
