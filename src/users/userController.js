import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create User with Employee
export const createUser = async (req, res) => {
  try {
    const { username, password_hash, is_active, role_id, employee } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        password_hash,
        is_active,
        role: { connect: { role_id } },
        employee: {
          create: {
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            hire_date: new Date(employee.hire_date),
            is_active: employee.is_active
          }
        }
      },
      include: {
        employee: true,
        role: true
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        employee: true,
        role: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(id) },
      include: { employee: true, role: true }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password_hash, is_active, role_id, employee } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: {
        username,
        password_hash,
        is_active,
        role: { connect: { role_id } },
        employee: {
          update: {
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            hire_date: new Date(employee.hire_date),
            is_active: employee.is_active
          }
        }
      },
      include: {
        employee: true,
        role: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete employee first to maintain foreign key constraint
    await prisma.employee.delete({
      where: { user_id: parseInt(id) }
    });

    await prisma.user.delete({
      where: { user_id: parseInt(id) }
    });

    res.json({ message: 'User and employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
