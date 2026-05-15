import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questionApi } from "../api";
import NavBar from "../components/NavBar";

function isProtected(question) {
  return question.answers.some((a) =>
    ["frontendDeveloper", "backendDeveloper", "dataAnalyst", "qaEngineer", "uxuiDesigner"].includes(a.itRoleId)
  );
}

export default function QuestionsPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    questionApi.list().then((data) => {
      setQuestions(data.itemList || []);
      setLoading(false);
    });
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    await questionApi.delete(id);
    load();
  }

  if (loading) return (
    <div className="page">
      <NavBar />
      <div className="center-screen"><div className="spinner" /></div>
    </div>
  );

  return (
    <div className="page">
      <NavBar />
      <div className="roles-wrap">

        <div className="page-header">
          <h1 className="page-title">Questions</h1>
          <button className="btn-outline" onClick={() => navigate("/create-question")}>
            + Create Question
          </button>
        </div>
        <p className="page-sub">Click delete to remove your own questions</p>

        <div className="roles-grid">
          {questions.map((q, idx) => (
            <div key={q.id} className="role-card">
              <div className="role-card-top">
                <span className="role-icon">💡</span>
                <span className="role-name">{q.text}</span>
                <div className="role-card-actions">
                  {!isProtected(q) && (
                    <button
                      className="btn-delete-role"
                      onClick={() => handleDelete(q.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}