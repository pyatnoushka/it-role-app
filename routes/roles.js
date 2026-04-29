const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const roles = db.prepare('SELECT * FROM it_role').all();
  res.json(roles);
});

router.get('/:id', (req, res) => {
  const role = db.prepare('SELECT * FROM it_role WHERE id = ?').get(req.params.id);
  if (!role) return res.status(404).json({ error: 'Role not found' });
  res.json(role);
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  const existing = db.prepare('SELECT * FROM it_role WHERE name = ?').get(name);
  if (existing) return res.status(400).json({ error: 'Role with this name already exists' });
  const result = db.prepare('INSERT INTO it_role (name, description) VALUES (?, ?)').run(name, description);
  res.json({ id: result.lastInsertRowid, name, description });
});

// update role
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const role = db.prepare('SELECT * FROM it_role WHERE id = ?').get(req.params.id);
  if (!role) return res.status(404).json({ error: 'Role not found' });
  db.prepare('UPDATE it_role SET name = ?, description = ? WHERE id = ?').run(name, description, req.params.id);
  res.json({ id: req.params.id, name, description });
});

// delete role
router.delete('/:id', (req, res) => {
  const role = db.prepare('SELECT * FROM it_role WHERE id = ?').get(req.params.id);
  if (!role) return res.status(404).json({ error: 'Role not found' });
  db.prepare('DELETE FROM it_role WHERE id = ?').run(req.params.id);
  res.json({ message: 'Role deleted successfully' });
});

module.exports = router;    