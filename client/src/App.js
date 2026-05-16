import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import RolesPage from "./pages/RolesPage";
import CreateRolePage from "./pages/CreateRolePage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import QuestionsPage from "./pages/QuestionsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/create-role" element={<CreateRolePage />} />
          <Route path="/create-question" element={<CreateQuestionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
