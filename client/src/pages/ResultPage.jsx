import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { itRoleApi } from "../api";
import NavBar from "../components/NavBar";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!scores) { navigate("/"); return; }
    itRoleApi.list().then((data) => {
      setRoles(data.itemList || []);
      setLoading(false);
    });
  }, []);

  if (!scores) return null;

  if (loading) return (
    <div className="page">
      <NavBar />
      <div className="center-screen"><div className="spinner" /></div>
    </div>
  );

const roleNameMap = {
  frontendDeveloper: "Frontend Developer",
  backendDeveloper: "Backend Developer",
  dataAnalyst: "Data Analyst",
  qaEngineer: "QA Engineer",
  uxuiDesigner: "UX/UI Designer",
};

const sorted = Object.entries(scores)
  .map(([id, count]) => ({
    role: roles.find((r) => r.id === id) || 
          roles.find((r) => r.name === roleNameMap[id]),
    count,
  }))
  .filter((r) => r.role)
  .sort((a, b) => b.count - a.count);

  const winner = sorted[0]?.role;
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="page">
      <NavBar />
      <div className="result-wrap">

        <div className="result-header">
          <p className="result-eyebrow">Your Result</p>
          <h1 className="result-title">Your best match is</h1>
        </div>

        {winner && (
          <div className="winner-card">
            <p className="winner-label">Recommended Role</p>
            <h2 className="winner-name">{winner.name}</h2>
            <p className="winner-desc">{winner.description}</p>
          </div>
        )}

        {sorted.length > 1 && (
          <div className="breakdown-card">
            <h3 className="breakdown-title">All results</h3>
            <div className="breakdown-list">
              {sorted.map(({ role, count }, i) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={role.id} className="breakdown-row">
                    <span className="bk-rank">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                    </span>
                    <span className="bk-name">{role.name}</span>
                    <div className="bk-bar-wrap">
                      <div className="bk-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="bk-pct">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="result-actions">
          <button className="btn-primary" onClick={() => navigate("/test")}>
            Try Again
          </button>
          <button className="btn-outline" onClick={() => navigate("/roles")}>
            See All Roles
          </button>
          <button className="btn-ghost" onClick={() => navigate("/")}>
            Home
          </button>
        </div>

      </div>
    </div>
  );
}