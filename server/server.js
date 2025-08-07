// This is the complete file ensuring the service routes are included.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Route imports
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const postRoutes = require('./routes/post.routes');
const adminRoutes = require('./routes/admin.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const paymentRoutes = require('./routes/payment.routes');
const serviceRoutes = require('./routes/service.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Successfully connected to MongoDB.");
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/services', serviceRoutes);

// Deployment config
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({ message: "Welcome to the Bloom Store backend API (Development Mode)." });
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});