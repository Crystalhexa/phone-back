import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCustomer = async (req, res) => {
  console.log("REQUEST BODY:", req.body); // Add this

  const { name, email, phone, address } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  try {
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Customer with this email already exists" });
    }

    const customer = await prisma.customer.create({
      data: { name, email, phone, address }
    });

    console.log("Saved to DB:", customer); // Debug
    res.status(201).json(customer);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: "Failed to create customer" });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: parseInt(id) }
    });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { customer_id: parseInt(id) },
      data: { name, email, phone, address }
    });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({
      where: { customer_id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
