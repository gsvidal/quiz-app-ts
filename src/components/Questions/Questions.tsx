import classes from './Questions.module.css';
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
  }, [setResults, questions.length]);

  const handleNextQuestion: (event: FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();

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
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSelectedChoice = (event: MouseEvent<HTMLLIElement>) => {
    setCurrentChoice(event.currentTarget.textContent);
  };

  const addLeadingZero = (number: number) => {
    return number > 9 ? number : `0${number}`;
  };

  return (
    <form onSubmit={handleNextQuestion} aria-label="form" className={classes.form}>
      <div className={classes['question-number']}>
        <span>{addLeadingZero(activeQuestionIndex + 1)}</span>
        <span className={classes['question-number--total']}>{addLeadingZero(questions.length)}</span>
      </div>
      <h2 className={classes.question}>{question}</h2>
      <ul className={classes['choices-list']}>
        {choices.map((choice) => (
          <li
            key={choice}
            onClick={handleSelectedChoice}
            className={`${classes.choice} ${currentChoice === choice ? classes.selected : ''}`}
          >
            {choice}
          </li>
        ))}
      </ul>
      <button
        type="submit"
        disabled={!currentChoice}
        className={`button ${!currentChoice ? classes.disabled : ''}`}
      >
        {activeQuestionIndex !== questions.length - 1 ? 'Next Question' : 'Finish'}
      </button>
    </form>
  );
};
