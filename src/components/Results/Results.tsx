import { useState, useEffect } from 'react';
import classes from './Results.module.css';
import { ResultsObj } from '../Quiz/Quiz';

export type ResultsProps = {
  results: ResultsObj;
  setShowResults: (bool: boolean) => void;
  setResults: (prevResults: ResultsObj) => void;
};

export const Results = ({ results, setShowResults, setResults }: ResultsProps): JSX.Element => {
  const { totalQuestions, totalScore, correctAnswers, wrongAnswers } = results;
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleResetApp = () => {
    setShowResults(false);
    setResults({
      totalQuestions: 0,
      totalScore: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  useEffect(() => {
    if (totalScore === totalQuestions * 5) {
      setFeedbackMessage('You Rock!!!');
    }
  }, [totalScore, totalQuestions]);

  return (
    <>
      <article className={classes.results}>
        <h2 className={classes['results-title']}>Results</h2>
        <p className={classes['results--score']}>
          <span>Total Score:</span> <span className={classes.data}>{totalScore}</span>
        </p>
        <p className={classes['results--total']}>
          <span>Total Questions:</span> <span className={classes.data}>{totalQuestions}</span>
        </p>
        <p className={classes['results--correct']}>
          <span>Correct Answers:</span> <span className={classes.data}>{correctAnswers}</span>
        </p>
        <p className={classes['results--wrong']}>
          <span>Wrong Answers:</span> <span className={classes.data}>{wrongAnswers}</span>
        </p>
      </article>
      <p className={classes.message}>{feedbackMessage}</p>

      <button type="button" onClick={handleResetApp} className={`button ${classes.reset}`}>
        Try Again
      </button>
    </>
  );
};
