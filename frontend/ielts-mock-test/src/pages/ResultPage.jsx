import { useLocation, useNavigate } from "react-router-dom";
import './ResultPage.css'

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Natija topilmadi</h2>
        <button onClick={() => navigate("/")}>Testni boshlash</button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h1>Natijalar</h1>
      <p>Umumiy savollar: {result.total_questions}</p>
      <p>To‘g‘ri javoblar: {result.correct_answers}</p>
      <p>Foiz: {result.percentage}%</p>

      <button className="restart-btn" onClick={() => navigate("/")}>Qayta boshlash</button>
    </div>
  );
}

export default ResultPage