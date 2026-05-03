const questionDao = require("../../dao/question-dao.js");

async function ListAbl(req, res) {
  try {
    const questionList = questionDao.list();
    res.json({ itemList: questionList });
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = ListAbl;