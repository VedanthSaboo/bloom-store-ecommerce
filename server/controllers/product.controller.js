// UPDATED: Restored all missing functions to resolve the server crash.

const Product = require('../models/product.model');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products.", error: error.message });
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching product.", error: error.message });
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error creating product.", error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.category = req.body.category || product.category;
            product.stock = req.body.stock || product.stock;

            if (req.file) {
                product.imageUrl = req.file.path;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating product.", error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product.", error: error.message });
    }
};

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private (User)
exports.createProductReview = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user.id.toString());
            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Product already reviewed' });
            }
            const review = {
                username: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user.id,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error creating review', error: error.message });
    }
};

// @desc    Search for products
// @route   GET /api/products/search
// @access  Public
exports.searchProducts = async (req, res) => {
    const keyword = req.query.keyword ? {
        $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } }
        ]
    } : {};

    try {
        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error searching products', error: error.message });
    }
};