const queries = {
    //PRODUCT QUERIES
    GET_ALL_PRODUCTS: `SELECT * FROM products ORDER BY id ASC`,
    
    GET_PRODUCT_BY_ID: 'SELECT * FROM products WHERE id = $1',
    CREATE_PRODUCT: 'INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    UPDATE_PRODUCT: 'UPDATE products SET name = $1, price = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *',
    DELETE_PRODUCT: 'DELETE FROM products WHERE id = $1',
    
    
    GET_PRODUCT_NAMES: 'SELECT name FROM products ORDER BY name',
    GET_NAMES_AND_PRICES: 'SELECT name, price FROM products ORDER BY price',
    GET_RETURNABLE_PRODUCTS: 'SELECT * FROM products WHERE can_be_returned = true ORDER BY name',
    GET_PRODUCTS_BY_PRICE_RANGE: 'SELECT * FROM products WHERE price >= $1 AND price <= $2 ORDER BY price',

    //SNACK QUERIES
    GET_ALL_SNACKS: 'SELECT * FROM snacks ORDER BY name',
    
    GET_SNACKS_SUMMARY: `
        SELECT 
            SUM(calories) as total_calories,
            ROUND(AVG(price)::numeric, 2) as average_price,
            MIN(price) as lowest_price,
            MAX(price) as highest_price
        FROM snacks
    `,
    
    GET_CATEGORY_INFO: `
        SELECT 
            kind,
            COUNT(*) as count,
            ROUND(AVG(calories)::numeric, 2) as avg_calories,
            ROUND(AVG(price)::numeric, 2) as avg_price
        FROM snacks
        GROUP BY kind
        ORDER BY kind
    `,

    //VEHICLE QUERIES
    GET_ALL_VEHICLES_WITH_OWNERS: `
        SELECT owners.*, vehicles.*
        FROM owners
        FULL OUTER JOIN vehicles ON owners.id = vehicles.owner_id
        ORDER BY owners.first_name ASC NULLS LAST, vehicles.id ASC
    `,
    
    GET_OWNER_VEHICLE_STATS: `
        SELECT 
            owners.first_name,
            owners.last_name,
            COUNT(vehicles.id) as vehicle_count,
            ROUND(AVG(COALESCE(vehicles.price, 0))::numeric, 2) as average_price
        FROM owners
        LEFT JOIN vehicles ON owners.id = vehicles.owner_id
        GROUP BY owners.id, owners.first_name, owners.last_name
        ORDER BY owners.first_name ASC
    `,

    
};

module.exports = queries;