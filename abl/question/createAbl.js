const Ajv = require("ajv");
const ajv = new Ajv();

const questionDao = require("../../dao/question-dao.js");

const schema = {
  type: "object",
  properties: {
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
  required: ["text", "answers"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    try {
      question = questionDao.create(question);
    } catch (e) {
      res.status(400).json({ ...e });
      return;
    }

    res.json(question);
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = CreateAbl;