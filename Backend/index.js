// Backend (Node.js + Express)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping_app',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Authentication Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Access denied');

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0) return res.status(400).send('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err) => {
        if (err) return res.status(500).send('Server error');
        res.status(201).send('User registered');
      }
    );
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(400).send('Invalid credentials');

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
  });
});

app.get('/profile', authenticate, (req, res) => {
  db.query('SELECT username FROM users WHERE username = ?', [req.user.username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');
    res.status(200).json({ username: results[0].username });
  });
});

app.put('/profile', authenticate, async (req, res) => {
  const { username, newPassword } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0 && username !== req.user.username) {
      return res.status(400).send('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query(
      'UPDATE users SET username = ?, password = ? WHERE username = ?',
      [username, hashedPassword, req.user.username],
      (err) => {
        if (err) return res.status(500).send('Server error');
        res.status(200).send('Profile updated successfully');
      }
    );
  });
});

// Products Route
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).send(results);
  });
});

// Cart Routes
app.get('/cart', authenticate, (req, res) => {
  db.query(
    'SELECT p.id, p.name, p.price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.username = ?',
    [req.user.username],
    (err, results) => {
      if (err) return res.status(500).send('Server error');
      res.status(200).send(results);
    }
  );
});


app.post('/cart', authenticate, (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).send('Product ID is required');
  }

  db.query(
    'INSERT INTO cart (username, product_id) VALUES (?, ?)',
    [req.user.username, productId],
    (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Failed to add product to cart');
      }
      res.status(200).send('Product added to cart');
    }
  );
});



app.delete('/cart/:productId', authenticate, (req, res) => {
  const { productId } = req.params;

  db.query(
    'DELETE FROM cart WHERE username = ? AND product_id = ?',
    [req.user.username, productId],
    (err) => {
      if (err) return res.status(500).send('Server error');
      res.status(200).send('Product removed from cart');
    }
  );
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
