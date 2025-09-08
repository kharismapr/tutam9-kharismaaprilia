// backend/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./database');

// Get todos by category
router.get('/todos', async (req, res) => {
  const { category } = req.query;
  try {
    let query = 'SELECT * FROM todos';
    const queryParams = [];

    if (category && ['Academic', 'Organization'].includes(category)) {
      query += ' WHERE category = $1';
      queryParams.push(category);
    }

    query += ' ORDER BY deadline ASC';
    
    const result = await db.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a todo
router.post('/todos', async (req, res) => {
  const { title, deadline, category } = req.body;
  if (!title || !deadline || !category) {
    return res.status(400).json({ error: 'Fill all the requirements' });
  }

  if (!category || !['Academic', 'Organization'].includes(category)) {
    return res.status(400).json({ error: 'Valid category (Academic or Organization) is required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO todos (title, deadline, category, completed) VALUES ($1, $2, $3, false) RETURNING *',
      [title, deadline, category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle todo completion status
router.patch('/todos/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;