import { render, screen } from '@testing-library/react';
import { Quiz } from './Quiz';
import { QuizProps } from './Quiz';

const quizProps: QuizProps = {
  props: 'string',
};

describe('Quiz', () => {
  test('renders Frontend Quiz heading', () => {
    render(<Quiz {...quizProps} />);
    const headingElement: HTMLHeadingElement = screen.getByRole('heading', { level: 1, name: /frontend quiz/i });
    expect(headingElement).toBeInTheDocument();
  });
});
