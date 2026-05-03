const Ajv = require("ajv");
const ajv = new Ajv();

const itRoleDao = require("../../dao/itRole-dao.js");

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
    const itRole = req.query;

    const valid = ajv.validate(schema, itRole);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const result = itRoleDao.get(itRole.id);
    if (!result) {
      res.status(404).json({
        code: "itRoleNotFound",
        message: "IT role with given id does not exist",
      });
      return;
    }

    res.json(result);
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = GetAbl;