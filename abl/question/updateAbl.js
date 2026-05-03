const Ajv = require("ajv");
const ajv = new Ajv();

const questionDao = require("../../dao/question-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    text: { type: "string" },
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: { type: "string" },
          itRoleId: { type: "string" },
        },
        required: ["text", "itRoleId"],
      },
      minItems: 2,
    },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let question = req.body;

    const valid = ajv.validate(schema, question);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const result = questionDao.update(question);
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

module.exports = UpdateAbl;