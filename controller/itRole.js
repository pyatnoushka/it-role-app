const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/itRole/getAbl");
const ListAbl = require("../abl/itRole/listAbl");
const CreateAbl = require("../abl/itRole/createAbl");
const UpdateAbl = require("../abl/itRole/updateAbl");
const DeleteAbl = require("../abl/itRole/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;