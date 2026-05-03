const itRoleDao = require("../../dao/itRole-dao.js");

async function ListAbl(req, res) {
  try {
    const itRoleList = itRoleDao.list();
    res.json({ itemList: itRoleList });
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
}

module.exports = ListAbl;
