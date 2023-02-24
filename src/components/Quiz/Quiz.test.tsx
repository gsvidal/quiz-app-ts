import { render, screen, waitFor, within } from '@testing-library/react';
import { Quiz } from './Quiz';
import { QuizProps } from './Quiz';
import { quiz } from '../../mocks/questions';
import userEvent from '@testing-library/user-event';

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
  test('should show total score as five if answer first question correctly (five points for correct answer(first choice))', async () => {
    const nextQuestionButtonElement: HTMLButtonElement = screen.getByRole('button', { name: /next question/i });

    for (let i = 0; i < quizProps.quiz.questions.length; i++) {
      const choicesOfQuestionElement: HTMLLIElement[] = screen.getAllByRole('listitem');
      const choiceSelectedElement = choicesOfQuestionElement[0];

      await waitFor(() => {
        userEvent.click(choiceSelectedElement);
      });
      await waitFor(() => {
        userEvent.click(nextQuestionButtonElement);
      });
    }

    const totalScoreElement = screen.getByText(/total score/i);
    expect(totalScoreElement.lastElementChild?.textContent).toBe('5');
  });
});
