const express = require('express');
const router = express.Router();
const db = require('../database');

const Ajv = require('ajv');
const ajv = new Ajv();

router.get('/', (req, res) => {
  const roles = db.prepare('SELECT * FROM it_role').all();
  res.json(roles);
});

router.get('/:id', (req, res) => {
  const role = db.prepare('SELECT * FROM it_role WHERE id = ?').get(req.params.id);
  if (!role) return res.status(404).json({ error: 'Role not found' });
  res.json(role);
});

const createRoleSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['name', 'description'],
  additionalProperties: false
};

router.post('/', (req, res) => {
const valid = ajv.validate(createRoleSchema, req.body);
if (!valid) {
  return res.status(400).json({
    error: 'invalidDtoIn',
    message: 'DtoIn is not valid.',
    invalidTypeKeyMap: ajv.errors
  });
}
  const { name, description } = req.body;
  const existing = db.prepare('SELECT * FROM it_role WHERE name = ?').get(name);
  if (existing) return res.status(400).json({ error: 'Role with this name already exists' });
  const result = db.prepare('INSERT INTO it_role (name, description) VALUES (?, ?)').run(name, description);
  res.json({ id: result.lastInsertRowid, name, description });
});

// update role
router.put('/:id', (req, res) => {
  const valid = ajv.validate(updateRoleSchema, req.body);
  if (!valid) {
    return res.status(400).json({
      error: 'invalidDtoIn',
      message: 'DtoIn is not valid.',
      invalidTypeKeyMap: ajv.errors
    });
  }

  const { name, description } = req.body;
  const role = db.prepare('SELECT * FROM it_role WHERE id = ?').get(req.params.id);
  if (!role) return res.status(404).json({ error: 'itRoleNotFound', message: 'IT role with given id does not exist' });
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