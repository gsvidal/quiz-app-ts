import { render, screen } from '@testing-library/react';
import { Quiz } from './Quiz';
import { QuizProps } from './Quiz';
import { quiz } from '../../mocks/questions';

const quizProps: QuizProps = {
  quiz,
};

beforeEach(() => {
  render(<Quiz {...quizProps} />);
});

describe('Quiz', () => {
  test('should show Frontend Quiz heading', () => {
    const headingElement: HTMLHeadingElement = screen.getByRole('heading', { level: 1, name: /frontend quiz/i });
    expect(headingElement).toBeInTheDocument();
  });
  test('should not show at the beginning results card, but render Questions', () => {
    const resultCardElement: HTMLElement | null = screen.queryByRole('article');
    expect(resultCardElement).not.toBeInTheDocument();

    const questionsElement = screen.getByRole('form');
    expect(questionsElement).toBeInTheDocument();
  });

  // test('after answer all questions should not show Questions and should show Results', () => {
  //   const questionButtonElement: HTMLButtonElement | null = screen.queryByRole('button', { name: /next question/i });
  //   expect(questionButtonElement).not.toBeInTheDocument();

  //   const resultCardElement: HTMLElement = screen.getByRole('article');
  //   expect(resultCardElement).toBeInTheDocument();
  // });
});
