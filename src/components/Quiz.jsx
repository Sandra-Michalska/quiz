import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const currentQuestionIndex = userAnswers.length;

    const quizIsComplete = currentQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
        setUserAnswers(prevUserAnswers => {
            return [
                ...prevUserAnswers,
                answer
            ];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); 

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
                <QuestionTimer
                    key={currentQuestionIndex}
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                />
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