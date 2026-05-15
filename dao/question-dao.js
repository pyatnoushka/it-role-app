const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const questionFolderPath = path.join(__dirname, "..", "storage", "questionList");

function get(questionId) {
  try {
    const filePath = path.join(questionFolderPath, `${questionId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadQuestion", message: error.message };
  }
}

function create(question) {
  try {
    question.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(questionFolderPath, `${question.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(question), "utf8");
    return question;
  } catch (error) {
    throw { code: "failedToCreateQuestion", message: error.message };
  }
}

function update(question) {
  try {
    const currentQuestion = get(question.id);
    if (!currentQuestion) return null;
    const newQuestion = { ...currentQuestion, ...question };
    const filePath = path.join(questionFolderPath, `${question.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newQuestion), "utf8");
    return newQuestion;
  } catch (error) {
    throw { code: "failedToUpdateQuestion", message: error.message };
  }
}

function remove(questionId) {
  try {
    const filePath = path.join(questionFolderPath, `${questionId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveQuestion", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(questionFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(path.join(questionFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListQuestions", message: error.message };
  }
}

function getTestQuestions() {
  try {
    const allQuestions = list();
    const groupedByRole = {};
    allQuestions.forEach((q) => {
      q.answers.forEach((a) => {
        if (!groupedByRole[a.itRoleId]) groupedByRole[a.itRoleId] = [];
        if (!groupedByRole[a.itRoleId].includes(q)) {
          groupedByRole[a.itRoleId].push(q);
        }
      });
    });
    let testQuestions = [];
    Object.values(groupedByRole).forEach((questions) => {
      const shuffled = questions.sort(() => Math.random() - 0.5);
      testQuestions = testQuestions.concat(shuffled.slice(0, 4));
    });
    return testQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
  } catch (error) {
    throw { code: "failedToGetTestQuestions", message: error.message };
  }
}

module.exports = { get, create, update, remove, list, getTestQuestions };

