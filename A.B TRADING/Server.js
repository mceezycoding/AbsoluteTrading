const express = require('express');
const app = express();
app.use(express.json());

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'absolutetradeonline@gmail.com',
    pass: 'mpxq yxef ecuo uvuo'
  }
});

// Contact route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact message:', { name, email, message });
  res.json({ success: true, message: 'Message received' });
});

// Middleware for basic validation
function validatePurchase(req, res, next) {
  const { name, email, productId, quantity } = req.body;
  if (!name || !email || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }
  next();
}

// Purchase route
app.post('/purchase', validatePurchase, async (req, res) => {
  const { name, email, productId, quantity } = req.body;

  try {
    console.log(`[${new Date().toISOString()}] Purchase received:`, {
      name,
      email,
      productId,
      quantity,
    });

    // TODO: Save to DB or send confirmation email
    // await savePurchaseToDB({ name, email, productId, quantity });
    // await sendConfirmationEmail(email);

    res.status(200).json({ message: 'Purchase successful' });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});