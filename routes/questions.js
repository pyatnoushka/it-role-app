const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const questions = db.prepare('SELECT * FROM question').all();
  res.json(questions);
});

router.get('/test', (req, res) => {
  const roles = db.prepare('SELECT id FROM it_role').all();
  let testQuestions = [];

  for (const role of roles) {
    const questions = db.prepare(`
      SELECT * FROM question 
      WHERE it_role_id = ? AND is_active = 1 
      ORDER BY RANDOM() 
      LIMIT 4
    `).all(role.id);
    testQuestions = testQuestions.concat(questions);
  }

  testQuestions.sort(() => Math.random() - 0.5);
  res.json(testQuestions);
});

router.post('/', (req, res) => {
  const { text, answer_option_a, answer_option_b, answer_option_c, it_role_id } = req.body;
  const result = db.prepare(`
    INSERT INTO question (text, answer_option_a, answer_option_b, answer_option_c, it_role_id)
    VALUES (?, ?, ?, ?, ?)
  `).run(text, answer_option_a, answer_option_b, answer_option_c, it_role_id);
  res.json({ id: result.lastInsertRowid, text, it_role_id });
});

// get one question
router.get('/:id', (req, res) => {
  const question = db.prepare('SELECT * FROM question WHERE id = ?').get(req.params.id);
  if (!question) return res.status(404).json({ error: 'Question not found' });
  res.json(question);
});

// update question
router.put('/:id', (req, res) => {
  const { text, answer_option_a, answer_option_b, answer_option_c, is_active, it_role_id } = req.body;
  const question = db.prepare('SELECT * FROM question WHERE id = ?').get(req.params.id);
  if (!question) return res.status(404).json({ error: 'Question not found' });
  db.prepare('UPDATE question SET text = ?, answer_option_a = ?, answer_option_b = ?, answer_option_c = ?, is_active = ?, it_role_id = ? WHERE id = ?')
    .run(text, answer_option_a, answer_option_b, answer_option_c, is_active, it_role_id, req.params.id);
  res.json({ id: req.params.id, text, answer_option_a, answer_option_b, answer_option_c, is_active, it_role_id });
});

// delete question
router.delete('/:id', (req, res) => {
  const question = db.prepare('SELECT * FROM question WHERE id = ?').get(req.params.id);
  if (!question) return res.status(404).json({ error: 'Question not found' });
  db.prepare('DELETE FROM question WHERE id = ?').run(req.params.id);
  res.json({ message: 'Question deleted successfully' });
});

module.exports = router;