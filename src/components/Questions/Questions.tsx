import './Questions.module.css';
import { QuestionObj } from '../../mocks/questions';
import { useState, FormEvent } from 'react';

export type QuestionsProps = {
  questions: QuestionObj[];
  setIsResultsShown: (bool: boolean) => void;
};

export const Questions = ({ questions, setIsResultsShown }: QuestionsProps): JSX.Element => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const { question, choices } = questions[activeQuestionIndex];

  const handleNextQuestion: (event: FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
      return;
    }
    setIsResultsShown(true);
  };
  return (
    <form onSubmit={handleNextQuestion} aria-label="form">
      <h2>{question}</h2>
      <ul>
        {choices.map((choice) => (
          <li key={choice}>{choice}</li>
        ))}
      </ul>
      <button type="submit">Next Question</button>
    </form>
  );
};
