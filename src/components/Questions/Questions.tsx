import './Questions.module.css';
import { QuestionObj } from '../../mocks/questions';
import { useState, MouseEvent } from 'react';

export type QuestionsProps = {
  questions: QuestionObj[];
};

export const Questions = ({ questions }: QuestionsProps): JSX.Element => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const { question, choices } = questions[activeQuestionIndex];

  const handleNextQuestion: (event: MouseEvent<HTMLButtonElement>) => void = (event) => {
    setActiveQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
  };
  return (
    <>
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
