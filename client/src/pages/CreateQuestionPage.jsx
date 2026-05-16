import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questionApi, itRoleApi, PROTECTED_ROLE_IDS } from "../api";

const emptyAnswer = () => ({ text: "", itRoleId: "" });

export default function CreateQuestionPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    emptyAnswer(), emptyAnswer(), emptyAnswer(), emptyAnswer(), emptyAnswer()
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    itRoleApi.list().then((data) => {
      const filtered = (data.itemList || []).filter((r) =>
        PROTECTED_ROLE_IDS.includes(r.id)
      );
      setRoles(filtered);
      setRolesLoading(false);
    });
  }, []);

  function updateAnswer(index, field, value) {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setError("");
  }

  async function handleSubmit() {
    if (!questionText.trim()) { setError("Please enter the question text"); return; }
    for (let i = 0; i < answers.length; i++) {
      if (!answers[i].text.trim()) {
        setError(`Please fill in answer ${String.fromCharCode(65 + i)}`);
        return;
      }
      if (!answers[i].itRoleId) {
        setError(`Please select a role for answer ${String.fromCharCode(65 + i)}`);
        return;
      }
    }

    setSaving(true);
    setError("");

    const result = await questionApi.create({
      text: questionText.trim(),
      answers: answers.map((a) => ({ text: a.text.trim(), itRoleId: a.itRoleId })),
    });

    if (result.code) {
      setError(result.message || "Something went wrong");
      setSaving(false);
    } else {
      setSuccess(true);
    }
  }

  function handleReset() {
    setQuestionText("");
    setAnswers([emptyAnswer(), emptyAnswer(), emptyAnswer(), emptyAnswer(), emptyAnswer()]);
    setSuccess(false);
    setError("");
  }

  if (rolesLoading) return <div className="center-screen"><div className="spinner" /></div>;

  if (roles.length === 0) return (
    <div className="center-screen">
      <div className="error-box">
        <p>Please create IT roles first before adding questions</p>
        <button className="btn-primary" onClick={() => navigate("/create-role")}>
          Create Role
        </button>
      </div>
    </div>
  );

  if (success) return (
    <div className="center-screen">
      <div className="success-box">
        <span className="success-icon">✅</span>
        <h2 className="success-title">Question Created!</h2>
        <p className="success-sub">Question with 5 answers added successfully</p>
        <div className="success-actions">
          <button className="btn-primary" onClick={handleReset}>Create Another</button>
          <button className="btn-outline" onClick={() => navigate("/test")}>Take Test</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="form-wrap form-wrap-wide">
      <div className="page-header">
        <h1 className="page-title">Create Question</h1>
      </div>
      <p className="page-sub">Each question has exactly 5 answer options</p>

      <div className="form-card">
        {error && <div className="form-error">⚠️ {error}</div>}

        <div className="field-group">
          <label className="field-label">Question Text</label>
          <textarea
            className="field-input field-textarea"
            placeholder="e.g. What do you enjoy doing most?"
            value={questionText}
            onChange={(e) => { setQuestionText(e.target.value); setError(""); }}
            rows={3}
          />
        </div>

        <div className="answers-section">
          <p className="answers-section-label">Answer Options (5 total)</p>
          {answers.map((ans, i) => (
            <div key={i} className="answer-form-row">
              <div className="ans-letter-badge">{String.fromCharCode(65 + i)}</div>
              <div className="ans-fields">
                <input
                  className="field-input"
                  placeholder={`Answer ${String.fromCharCode(65 + i)}...`}
                  value={ans.text}
                  onChange={(e) => updateAnswer(i, "text", e.target.value)}
                />
                <select
                  className="field-input field-select"
                  value={ans.itRoleId}
                  onChange={(e) => updateAnswer(i, "itRoleId", e.target.value)}
                >
                  <option value="">— Select IT Role —</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-primary btn-wide"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving..." : "Create Question"}
        </button>
      </div>
    </div>
  );
}