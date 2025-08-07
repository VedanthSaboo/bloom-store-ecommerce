// NEW FILE: Contains the logic for managing blog posts.

const Post = require('../models/post.model');

// A simple function to create a URL-friendly slug
const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

// @desc    Create a new blog post
// @route   POST /api/posts
// @access  Private (Admin)
exports.createPost = async (req, res) => {
    const { title, content, featuredImage } = req.body;
    const slug = createSlug(title);

    const post = new Post({
        title,
        content,
        featuredImage,
        slug,
        author: req.user.id,
    });

    try {
        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error: error.message });
    }
};

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('author', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// @desc    Get a single blog post by slug
// @route   GET /api/posts/:slug
// @access  Public
exports.getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username');
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

// @desc    Update a blog post
// @route   PUT /api/posts/:id
// @access  Private (Admin)
exports.updatePost = async (req, res) => {
    const { title, content, featuredImage } = req.body;

    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            post.title = title || post.title;
            post.content = content || post.content;
            post.featuredImage = featuredImage || post.featuredImage;
            if (title) {
                post.slug = createSlug(title);
            }

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating post', error: error.message });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private (Admin)
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.remove();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};