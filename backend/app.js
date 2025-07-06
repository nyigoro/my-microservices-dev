const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Load .env for local testing if needed

const app = express();
app.use(express.json()); // For parsing application/json

const port = process.env.PORT || 8080; // Default to 8080

// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost', // 'database' for Docker Compose
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
};

const pool = new Pool(dbConfig);

// Test database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.error('DB Config:', dbConfig);
    return;
  }
  client.query('SELECT NOW()', (err, res) => {
    done();
    if (err) {
      console.error('Error executing query:', err.stack);
    } else {
      console.log('Database connected successfully:', res.rows[0].now);
    }
  });
  console.log('PostgreSQL client connected!');
});

// API Routes
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

// Simple route to create a user (for testing DB writes)
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend API listening on http://0.0.0.0:${port}`);
});
