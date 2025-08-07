// NEW FILE: Controller for handling admin-specific data requests.

const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find({});
        const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalSales: totalSales.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching stats', error: error.message });
    }
};