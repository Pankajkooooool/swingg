const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

// 4. Define Sequelize models
const sequelize = new Sequelize('ecommerce', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Order = sequelize.define('Order', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// 5. Implement CRUD operations
// Create
app.post('/orders', async (req, res) => {
  try {
    const { customerName, productName, quantity, totalAmount } = req.body;
    const order = await Order.create({ customerName, productName, quantity, totalAmount });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
app.put('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { customerName, productName, quantity, totalAmount } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.customerName = customerName;
    order.productName = productName;
    order.quantity = quantity;
    order.totalAmount = totalAmount;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
app.delete('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});