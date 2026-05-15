import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questionApi } from "../api";
import NavBar from "../components/NavBar";

export default function TestPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    questionApi.test()
      .then((data) => {
        if (data.itemList && data.itemList.length > 0) {
          setQuestions(data.itemList);
        } else {
          setError("No questions found. Please create questions first.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load questions. Make sure the server is running.");
        setLoading(false);
      });
  }, []);

 function handleAnswer(answer) {
    setSelected(answer);
    const newScores = { ...scores };
    newScores[answer.itRoleId] = (newScores[answer.itRoleId] || 0) + 1;
    setScores(newScores);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      navigate("/result", { state: { scores } });
    }
  }

  if (loading) return (
    <div className="page">
      <NavBar />
      <div className="center-screen"><div className="spinner" /></div>
    </div>
  );

  if (error) return (
    <div className="page">
      <NavBar />
      <div className="center-screen">
        <div className="error-box">
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate("/create-question")}>
            Create Questions
          </button>
        </div>
      </div>
    </div>
  );

  const question = questions[current];
  const progress = (current / questions.length) * 100;
  const isLast = current + 1 === questions.length;

  return (
    <div className="page">
      <NavBar />
      <div className="test-wrap">

        <div className="test-topbar">
          <div className="test-counter">
            <span className="counter-current">{current + 1}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">{questions.length}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="question-box">
          <p className="question-label">Question {current + 1}</p>
          <h2 className="question-text">{question.text}</h2>
        </div>

        <div className="answers-list">
          {question.answers.map((answer, i) => (
            <button
              key={i}
              className={`answer-btn ${selected === answer ? "answer-chosen" : ""}`}
              onClick={() => handleAnswer(answer)}
              disabled={false}
            >
              <span className="ans-badge">{String.fromCharCode(65 + i)}</span>
              <span className="ans-text">{answer.text}</span>
            </button>
          ))}
        </div>

        {selected && (
          <button className="btn-primary btn-wide" onClick={handleNext}>
            {isLast ? "See Results →" : "Next Question →"}
          </button>
        )}

      </div>
    </div>
  );
}

