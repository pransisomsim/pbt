const Category = require('../models/category');

class CategoryController {
    static async getAll(req, res) {
        try {
            const categories = await Category.findAllByUser(req.userId);
            res.json({ categories });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }

    static async create(req, res) {
        try {
            const { name, type } = req.body;
            if (!name || !type) {
                return res.status(400).json({ error: 'Name and type are required' });
            }
            
            const category = await Category.create(req.userId, name, type);
            res.status(201).json({ message: 'Category created', categoryId: category.id });
        } catch (err) {
            res.status(500).json({ error: 'Failed to create category' });
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await Category.delete(req.params.id, req.userId);
            if (!deleted) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ message: 'Category deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete category' });
        }
    }
}

module.exports = CategoryController;
