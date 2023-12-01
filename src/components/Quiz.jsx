import { useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const currentQuestionIndex = userAnswers.length;

    const quizIsComplete = currentQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(answer) {
        setUserAnswers(prevUserAnswers => {
            return [
                ...prevUserAnswers,
                answer
            ];
        });
    }

    if(quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz completed!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[currentQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer =>
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}