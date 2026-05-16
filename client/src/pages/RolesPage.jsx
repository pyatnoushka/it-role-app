import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itRoleApi, PROTECTED_ROLE_IDS } from "../api";

export default function RolesPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  function load() {
    itRoleApi.list().then((data) => {
      setRoles(data.itemList || []);
      setLoading(false);
    });
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    await itRoleApi.delete(id);
    setSelected(null);
    load();
  }

  if (loading) return <div className="center-screen"><div className="spinner" /></div>;

  return (
    <div className="roles-wrap">
      <div className="page-header">
        <h1 className="page-title">IT Roles</h1>
        <button className="btn-outline" onClick={() => navigate("/create-role")}>
          + Create Role
        </button>
      </div>
      <p className="page-sub">Click on a role to read its description</p>

      {roles.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🗂️</span>
          <p>No roles yet</p>
          <button className="btn-primary" onClick={() => navigate("/create-role")}>
            Create First Role
          </button>
        </div>
      ) : (
        <div className="roles-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${selected?.id === role.id ? "role-card-active" : ""}`}
            >
              <div
                className="role-card-top"
                onClick={() => setSelected(selected?.id === role.id ? null : role)}
              >
                <span className="role-icon">💼</span>
                <span className="role-name">{role.name}</span>
                <div className="role-card-actions">
                  {!PROTECTED_ROLE_IDS.includes(role.id) && (
                    <button
                      className="btn-delete-role"
                      onClick={(e) => { e.stopPropagation(); handleDelete(role.id); }}
                    >
                      Delete
                    </button>
                  )}
                  <span className="role-arrow">
                    {selected?.id === role.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>
              {selected?.id === role.id && (
                <div className="role-detail">
                  <p className="role-desc">{role.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}