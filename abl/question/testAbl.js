const questionDao = require("../../dao/question-dao.js");

async function TestAbl(req, res) {
  try {
    const testQuestions = questionDao.getTestQuestions();
    res.json({ itemList: testQuestions });
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = TestAbl;