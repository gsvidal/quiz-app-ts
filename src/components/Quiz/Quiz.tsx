import './Quiz.module.css';

import { QuizObj } from '../../mocks/questions';
import { useState, MouseEvent } from 'react';

export type QuizProps = {
  quiz: QuizObj;
};

export const Quiz = ({ quiz }: QuizProps): JSX.Element => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const { questions } = quiz;
  const { question, choices } = questions[activeQuestionIndex];

  const handleNextQuestion: (event: MouseEvent<HTMLButtonElement>) => void = (event) => {
    setActiveQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
  };

  return (
    <>
      <h1>FrontEnd Quiz</h1>
      <h2>{question}</h2>
      <ul>
        {choices.map((choice) => (
          <li key={choice}>{choice}</li>
        ))}
      </ul>
      <button onClick={handleNextQuestion}>Next Question</button>
    </>
  );
};
