import { render, screen } from '@testing-library/react';
import { Results } from './Results';
import { ResultsProps } from './Results';
import { ResultsObj } from '../Quiz/Quiz';

const resultsMock: ResultsObj = {
  totalQuestions: 4,
  totalScore: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};

const resultsProps: ResultsProps = {
  results: resultsMock,
};

beforeEach(() => {
  render(<Results {...resultsProps} />);
});

describe('Results', () => {
  test('should show Results title', () => {
    const titleResultsElement = screen.getByRole('heading', { level: 2, name: /results/i });
    expect(titleResultsElement).toBeInTheDocument();
  });
  test('should show results labels', () => {
    const totalQuestionElement = screen.getByText(/total questions/i);
    const totalScoreElement = screen.getByText(/total score/i);
    const correctAnswersElement = screen.getByText(/correct answers/i);
    const wrongAnswersElement = screen.getByText(/wrong answers/i);

    expect(totalQuestionElement).toBeInTheDocument();
    expect(totalScoreElement).toBeInTheDocument();
    expect(correctAnswersElement).toBeInTheDocument();
    expect(wrongAnswersElement).toBeInTheDocument();
  });
  test('should show the correct amount of total questions', () => {
    const totalQuestionElement = screen.getByText(/total questions/i);
    expect(Number(totalQuestionElement.lastElementChild?.textContent)).toBe(resultsMock.totalQuestions);
  });
});
