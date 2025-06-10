// src/userRoles/userRolesController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE Role
// Updated createRole with uniqueness check
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const existingRole = await prisma.role.findUnique({
      where: { name }
    });

    if (existingRole) {
      return res.status(400).json({ error: 'Role with this name already exists' });
    }

    const role = await prisma.role.create({
      data: { name },
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create role', details: error.message });
  }
};

// READ All Roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles', details: error.message });
  }
};

// READ One Role by ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: { role_id: parseInt(id) },
    });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch role', details: error.message });
  }
};

// UPDATE Role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await prisma.role.update({
      where: { role_id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role', details: error.message });
  }
};

// DELETE Role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({
      where: { role_id: parseInt(id) },
    });
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role', details: error.message });
  }
};
