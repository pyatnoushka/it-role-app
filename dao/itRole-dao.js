const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const itRoleFolderPath = path.join(__dirname, "..", "storage", "itRoleList");

function get(itRoleId) {
  try {
    const filePath = path.join(itRoleFolderPath, `${itRoleId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadItRole", message: error.message };
  }
}

function create(itRole) {
  try {
    const itRoleList = list();
    if (itRoleList.some((item) => item.name === itRole.name)) {
      throw { code: "uniqueNameAlreadyExists", message: "IT role with this name already exists" };
    }
    itRole.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(itRoleFolderPath, `${itRole.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(itRole), "utf8");
    return itRole;
  } catch (error) {
    if (error.code === "uniqueNameAlreadyExists") throw error;
    throw { code: "failedToCreateItRole", message: error.message };
  }
}

function update(itRole) {
  try {
    const currentItRole = get(itRole.id);
    if (!currentItRole) return null;
    if (itRole.name && itRole.name !== currentItRole.name) {
      const itRoleList = list();
      if (itRoleList.some((item) => item.name === itRole.name)) {
        throw { code: "uniqueNameAlreadyExists", message: "IT role with this name already exists" };
      }
    }
    const newItRole = { ...currentItRole, ...itRole };
    const filePath = path.join(itRoleFolderPath, `${itRole.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newItRole), "utf8");
    return newItRole;
  } catch (error) {
    if (error.code === "uniqueNameAlreadyExists") throw error;
    throw { code: "failedToUpdateItRole", message: error.message };
  }
}

function remove(itRoleId) {
  try {
    const filePath = path.join(itRoleFolderPath, `${itRoleId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveItRole", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(itRoleFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(path.join(itRoleFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListItRoles", message: error.message };
  }
}

module.exports = { get, create, update, remove, list };