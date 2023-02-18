import './Quiz.module.css';

import { QuizObj } from '../../mocks/questions';
import { useState } from 'react';

export type QuizProps = {
  quiz: QuizObj;
};

export const Quiz = ({ quiz }: QuizProps): JSX.Element => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const { questions } = quiz;

  return (
    <>
      <h1>FrontEnd Quiz</h1>
      <h2>{questions[activeQuestionIndex].question}</h2>
    </>
  );
};
