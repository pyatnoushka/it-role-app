const Ajv = require("ajv");
const ajv = new Ajv();

const questionDao = require("../../dao/question-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const question = req.query;

    const valid = ajv.validate(schema, question);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const result = questionDao.get(question.id);
    if (!result) {
      res.status(404).json({
        code: "questionNotFound",
        message: "Question with given id does not exist",
      });
      return;
    }

    res.json(result);
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = GetAbl;