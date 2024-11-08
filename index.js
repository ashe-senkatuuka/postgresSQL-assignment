// Required dependencies
const express = require('express');
const db = require('./db');
const queries = require('./queries');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));


// Get all product names
app.get('/api/products/names', async (req, res) => {
    try {
        const result = await db.query(queries.GET_PRODUCT_NAMES);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting product names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get names and prices
app.get('/api/products/names-prices', async (req, res) => {
    try {
        const result = await db.query(queries.GET_NAMES_AND_PRICES);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting names and prices:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get returnable products
app.get('/api/products/returnable', async (req, res) => {
    try {
        const result = await db.query(queries.GET_RETURNABLE_PRODUCTS);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting returnable products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get products by price range
app.get('/api/products/by-price/', async (req, res) => {
    try {
        let { min, max } = req.query;

        const DEFAULT_MIN_PRICE = 0;
        const DEFAULT_MAX_PRICE = 10000;

        // Default values if not provided
        min = parseFloat(min) || DEFAULT_MIN_PRICE;
        max = parseFloat(max) || DEFAULT_MAX_PRICE;

        // Validate input
        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({
                error: 'Invalid price range. Please provide numeric values.'
            });
        }

        const result = await db.query(
            queries.GET_PRODUCTS_BY_PRICE_RANGE,
            [min, max]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting products by price:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//create new product
app.post('/api/products', async (req, res) => {
    const { name, price, description, image_url } = req.body;
    try {
        const result = await db.query(
            queries.CREATE_PRODUCT,
            [name, price, description, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const result = await db.query(queries.GET_PRODUCT_BY_ID, [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await db.query(queries.GET_ALL_PRODUCTS);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all snacks
app.get('/api/snacks', async (req, res) => {
    try {
        const result = await db.query(queries.GET_ALL_SNACKS);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting snacks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get snacks summary
app.get('/api/snacks/summary', async (req, res) => {
    try {
        const result = await db.query(queries.GET_SNACKS_SUMMARY);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error getting snacks summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get category information
app.get('/api/snacks/categories', async (req, res) => {
    try {
        const result = await db.query(queries.GET_CATEGORY_INFO);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting category info:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all vehicles
app.get('/api/vehicles/vehicles', async (req, res) => {
    try {
        const result = await db.query(queries.GET_ALL_VEHICLES_WITH_OWNERS);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting vehicles:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all owners
app.get('/api/vehicles/owners', async (req, res) => {
    try {
        const result = await db.query(queries.GET_OWNER_VEHICLE_STATS);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting owners:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});