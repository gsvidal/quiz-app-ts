import './Quiz.module.css';
import { QuizObj } from '../../mocks/questions';
import { Questions } from '../Questions/Questions';
import { useState } from 'react';
import { Results } from '../Results/Results';

export type QuizProps = {
  quiz: QuizObj;
};

export const Quiz = ({ quiz }: QuizProps): JSX.Element => {
  // const [results, setResults] = useState<>({
  //   score: 0
  // })
  const [isResultsShown, setIsResultsShown] = useState<boolean>(false);
  const { questions } = quiz;

  return (
    <>
      <h1>FrontEnd Quiz</h1>
      {isResultsShown ? <Results /> : <Questions questions={questions} setIsResultsShown={setIsResultsShown} />}
    </>
  );
};
