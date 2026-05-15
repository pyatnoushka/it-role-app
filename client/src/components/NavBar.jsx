import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { path: "/", label: "Home" },
  { path: "/test", label: "Take Test" },
  { path: "/roles", label: "IT Roles" },
  { path: "/questions", label: "Questions" },
  { path: "/create-role", label: "Create Role" },
  { path: "/create-question", label: "Create Question" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <span className="navbar-logo" onClick={() => navigate("/")}>
        IT Role
      </span>
      <div className="navbar-links">
        {links.map((l) => (
          <button
            key={l.path}
            className={`nav-link ${location.pathname === l.path ? "nav-active" : ""}`}
            onClick={() => navigate(l.path)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}