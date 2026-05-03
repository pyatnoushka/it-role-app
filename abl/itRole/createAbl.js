const Ajv = require("ajv");
const ajv = new Ajv();

const itRoleDao = require("../../dao/itRole-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["name", "description"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let itRole = req.body;

    const valid = ajv.validate(schema, itRole);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    try {
      itRole = itRoleDao.create(itRole);
    } catch (e) {
      res.status(400).json({ ...e });
      return;
    }

    res.json(itRole);
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = CreateAbl;