app.post('/users', async (req, res) => {
  const { username, email } = req.body;
  const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
  res.json(result.rows[0]);
});

// READ
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// UPDATE
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const result = await pool.query('UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING *', [username, email, id]);
  res.json(result.rows[0]);
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id=$1', [id]);
  res.json({ message: 'User deleted successfully' });
});
