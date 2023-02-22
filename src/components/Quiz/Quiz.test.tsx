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
});
