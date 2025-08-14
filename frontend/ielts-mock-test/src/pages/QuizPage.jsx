import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizPage.css";

function QuizPage() {
  const API_URL = 'https://ielts-mock-test.hx.com/';
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 daqiqa
  const navigate = useNavigate();

  // Savollarni aralashtirish funksiyasi
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Savollarni yuklash
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const validData = Array.isArray(data) ? data : [];
        setQuestions(shuffleArray(validData)); // Tasodifiy tartib
        setLoading(false);
      })
      .catch((err) => {
        console.error("Savollarni olishda xatolik:", err);
        setLoading(false);
      });
  }, []);

  // Javob tanlash
  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Yuborish
  const handleSubmit = useCallback(() => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/result", { state: { result } });
      })
      .catch((err) => console.error("Javob yuborishda xatolik:", err));
  }, [answers, navigate]);

  // Effekt: taymer tick
  useEffect(() => {
    if (!started) return;
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [started, timeLeft]);

  // Effekt: vaqt tugaganda yuborish
  useEffect(() => {
    if (started && timeLeft === 0) {
      handleSubmit();
    }
  }, [started, timeLeft, handleSubmit]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (loading) return <p>Yuklanmoqda...</p>;
  if (questions.length === 0) return <p>Savollar topilmadi</p>;

  return (
    <div className="quiz-container">
      {!started ? (
        <div className="start-screen">
          <h1>Testga Xush Kelibsiz!</h1>
          <p>Testni boshlash uchun quyidagi tugmani bosing.</p>
          <button className="start-btn" onClick={() => setStarted(true)}>
            Testni Boshlash
          </button>
        </div>
      ) : (
        <>
          <div className="timer">
            Qolgan vaqt: {minutes}:{seconds.toString().padStart(2, "0")}
          </div>

          <h1>Test Savollari</h1>

          {questions.map((q, qIndex) => (
            <div key={q.id} className="quiz-question">
              <p>
                <strong>{qIndex + 1}.</strong> {q.text}
              </p>

              {[q.option_a, q.option_b, q.option_c, q.option_d].map(
                (opt, i) => {
                  const letter = String.fromCharCode(65 + i); // A, B, C, D
                  return (
                    <label key={i} className="option-label">
                      <input
                        type="radio"
                        name={`question_${q.id}`}
                        value={letter}
                        checked={answers[q.id] === letter}
                        onChange={() => handleAnswerChange(q.id, letter)}
                      />
                      {letter}) {opt}
                    </label>
                  );
                }
              )}
            </div>
          ))}

          <button onClick={handleSubmit} className="submit-btn">
            Topshirish
          </button>
        </>
      )}
    </div>
  );
}

export default QuizPage;
