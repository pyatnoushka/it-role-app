const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const rolesRouter = require('./routes/roles');
const questionsRouter = require('./routes/questions');

app.use('/api/roles', rolesRouter);
app.use('/api/questions', questionsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});