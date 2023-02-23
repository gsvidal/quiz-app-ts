import './Results.module.css';
import { ResultsObj } from '../Quiz/Quiz';

export type ResultsProps = {
  results: ResultsObj;
};

export const Results = ({ results }: ResultsProps): JSX.Element => {
  const { totalQuestions, totalScore, correctAnswers, wrongAnswers } = results;
  return (
    <article>
      <h2>Results</h2>
      <p>
        Total Score: <span>{totalScore}</span>
      </p>
      <p>
        Total Questions: <span>{totalQuestions}</span>
      </p>
      <p>
        Correct Answers: <span>{}</span>{' '}
      </p>
      <p>
        Wrong Answers: <span>{}</span>{' '}
      </p>
    </article>
  );
};
