const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/question/getAbl");
const ListAbl = require("../abl/question/listAbl");
const CreateAbl = require("../abl/question/createAbl");
const UpdateAbl = require("../abl/question/updateAbl");
const DeleteAbl = require("../abl/question/deleteAbl");
const TestAbl = require("../abl/question/testAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.get("/test", TestAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;