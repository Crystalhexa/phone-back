import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const { username, password_hash, is_active = true, role_id, employee } = req.body;

    // Validation: Required fields
    if (!username || !password_hash || !employee?.name || !employee?.email || !role_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { role_id }
    });

    if (!existingRole) {
      return res.status(400).json({ error: 'Invalid role_id' });
    }

    // Check if employee email, phone or NIC already exists
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [
          { email: employee.email },
          employee.phone ? { phone: employee.phone } : undefined,
          employee.nic ? { nic: employee.nic } : undefined
        ].filter(Boolean)
      }
    });

    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with this email, phone, or NIC already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password_hash, 10); // 10 is the salt rounds

    // Create the user and the associated employee
    const newUser = await prisma.user.create({
      data: {
        username,
        password_hash: hashedPassword,
        is_active,
        role: { connect: { role_id } },
        employee: {
          create: {
            name: employee.name,
            email: employee.email,
            phone: employee.phone || null,
            nic: employee.nic || null,
            gender: employee.gender || null,
            dob: employee.dob ? new Date(employee.dob) : null,
            position: employee.position || null,
            hire_date: employee.hire_date ? new Date(employee.hire_date) : undefined,
            is_active: employee.is_active !== undefined ? employee.is_active : true
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
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message || 'Failed to create user' });
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
