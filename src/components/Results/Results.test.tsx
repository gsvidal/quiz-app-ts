import { render, screen, waitFor } from '@testing-library/react';
import { Results } from './Results';
import { ResultsProps } from './Results';
import { ResultsObj } from '../Quiz/Quiz';
import userEvent from '@testing-library/user-event';

const resultsMock: ResultsObj = {
  totalQuestions: 4,
  totalScore: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};

const mockFn = jest.fn();

const resultsProps: ResultsProps = {
  results: resultsMock,
  setShowResults: mockFn,
  setResults: mockFn,
};

beforeEach(() => {
  render(<Results {...resultsProps} />);
});

describe('Results', () => {
  test('should show Results title', () => {
    const titleResultsElement: HTMLHeadingElement = screen.getByRole('heading', { level: 2, name: /results/i });
    expect(titleResultsElement).toBeInTheDocument();
  });
  test('should show results labels', () => {
    const totalQuestionElement: HTMLSpanElement = screen.getByText(/total questions/i);
    const totalScoreElement: HTMLSpanElement = screen.getByText(/total score/i);
    const correctAnswersElement: HTMLSpanElement = screen.getByText(/correct answers/i);
    const wrongAnswersElement: HTMLSpanElement = screen.getByText(/wrong answers/i);

    expect(totalQuestionElement).toBeInTheDocument();
    expect(totalScoreElement).toBeInTheDocument();
    expect(correctAnswersElement).toBeInTheDocument();
    expect(wrongAnswersElement).toBeInTheDocument();
  });
  test('should show the correct amount of total questions', () => {
    const totalQuestionElement: HTMLSpanElement = screen.getByText(/total questions/i);
    expect(Number(totalQuestionElement.nextElementSibling?.textContent)).toBe(resultsMock.totalQuestions);
  });

});
