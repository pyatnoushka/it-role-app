import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <p className="hero-eyebrow">Career Test</p>
      <h1 className="hero-title">
        Who will you become <span className="grad-text">in IT?</span>
      </h1>
      <p className="hero-sub">
        Take the test and find out which IT profession suits you best
      </p>
      <button className="btn-hero" onClick={() => navigate("/test")}>
        Start Test →
      </button>
    </div>
  );
}