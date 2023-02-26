import classes from './Quiz.module.css';
import { QuizObj } from '../../mocks/questions';
import { Questions } from '../Questions/Questions';
import { useState } from 'react';
import { Results } from '../Results/Results';

export type QuizProps = {
  quiz: QuizObj;
};

export type ResultsObj = {
  totalQuestions: number;
  totalScore: number;
  correctAnswers: number;
  wrongAnswers: number;
};

export const Quiz = ({ quiz }: QuizProps): JSX.Element => {
  const [results, setResults] = useState<ResultsObj>({
    totalQuestions: 0,
    totalScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResults, setShowResults] = useState<boolean>(false);
  const { questions } = quiz;

  return (
    <>
      <h1 className={classes.title}>FrontEnd Quiz</h1>
      {showResults ? (
        <Results results={results} setShowResults={setShowResults} setResults={setResults}/>
      ) : (
        <Questions questions={questions} setShowResults={setShowResults} setResults={setResults} />
      )}
    </>
  );
};
