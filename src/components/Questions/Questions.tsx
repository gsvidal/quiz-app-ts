import './Questions.module.css';
import { QuestionObj } from '../../mocks/questions';
import { useState, FormEvent, MouseEvent, useEffect } from 'react';
import { ResultsObj } from '../Quiz/Quiz';

export type QuestionsProps = {
  questions: QuestionObj[];
  setShowResults: (bool: boolean) => void;
  setResults: (cb: (prevResults: ResultsObj) => ResultsObj) => void;
};

export const Questions = ({ questions, setShowResults, setResults }: QuestionsProps): JSX.Element => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const { question, choices, correctAnswer } = questions[activeQuestionIndex];
  const [currentChoice, setCurrentChoice] = useState<string | null>('');

  useEffect(() => {
    setResults((prevResults) => {
      return { ...prevResults, totalQuestions: questions.length };
    });
  }, []);

  const handleNextQuestion: (event: FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
      // Checking if is correct answer or not and score
      setResults((prevResults) =>
        currentChoice === correctAnswer
          ? {
              ...prevResults,
              totalScore: prevResults.totalScore + 5,
              correctAnswers: prevResults.correctAnswers + 1,
            }
          : {
              ...prevResults,
              wrongAnswers: prevResults.wrongAnswers + 1,
            }
      );
      setCurrentChoice('');
      return;
    }
    setShowResults(true);
  };

  const handleSelectedChoice = (event: MouseEvent<HTMLLIElement>) => {
    setCurrentChoice(event.currentTarget.textContent);
  };

  return (
    <form onSubmit={handleNextQuestion} aria-label="form">
      <h2>{question}</h2>
      <ul>
        {choices.map((choice) => (
          <li key={choice} onClick={handleSelectedChoice}>
            {choice}
          </li>
        ))}
      </ul>
      <button type="submit" disabled={!currentChoice}>
        {activeQuestionIndex !== questions.length - 1 ? 'Next Question' : 'Finish'}
      </button>
    </form>
  );
};
