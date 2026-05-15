import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { itRoleApi } from "../api";
import NavBar from "../components/NavBar";

export default function CreateRolePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    if (!name.trim()) { setError("Please enter a role name"); return; }
    if (!description.trim()) { setError("Please enter a description"); return; }

    setSaving(true);
    setError("");

    const result = await itRoleApi.create({
      name: name.trim(),
      description: description.trim(),
    });

    if (result.code) {
      setError(result.message || "Something went wrong");
      setSaving(false);
    } else {
      setSuccess(true);
    }
  }

  if (success) return (
    <div className="page">
      <NavBar />
      <div className="center-screen">
        <div className="success-box">
          <span className="success-icon">✅</span>
          <h2 className="success-title">Role Created!</h2>
          <p className="success-sub">The IT role was successfully added</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => { setName(""); setDescription(""); setSuccess(false); }}>
              Create Another
            </button>
            <button className="btn-outline" onClick={() => navigate("/roles")}>
              See All Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <NavBar />
      <div className="form-wrap">

        <div className="page-header">
          <h1 className="page-title">Create IT Role</h1>
        </div>
        <p className="page-sub">Add a new profession to the database</p>

        <div className="form-card">
          {error && (
            <div className="form-error">⚠️ {error}</div>
          )}

          <div className="field-group">
            <label className="field-label">Role Name</label>
            <input
              className="field-input"
              placeholder="e.g. Frontend Developer"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Description</label>
            <textarea
              className="field-input field-textarea"
              placeholder="Describe what this specialist does..."
              value={description}
              onChange={(e) => { setDescription(e.target.value); setError(""); }}
              rows={5}
            />
          </div>

          <button
            className="btn-primary btn-wide"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Create Role"}
          </button>
        </div>

      </div>
    </div>
  );
}