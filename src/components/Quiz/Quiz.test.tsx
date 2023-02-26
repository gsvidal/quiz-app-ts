import { render, screen, waitFor } from '@testing-library/react';
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
    expect(totalScoreElement.nextElementSibling?.textContent).toBe('5');
  });

  test('when results component is shown, should show try again button, and when clicked should not render that button ', async () => {
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

    const tryAgainButtonElement: HTMLButtonElement = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButtonElement).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(tryAgainButtonElement);
    });

    const tryAgainButtonElementAfterClick: HTMLButtonElement | null = screen.queryByRole('button', {
      name: /try again/i,
    });

    expect(tryAgainButtonElementAfterClick).not.toBeInTheDocument();
  });
  test('should show "You Rock!" when user gets all questions answers correctly', async () => {
    const nextQuestionButtonElement: HTMLButtonElement = screen.getByRole('button', { name: /next question/i });
    // 1st
    const choicesOfQuestionElement: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement = choicesOfQuestionElement[0];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });
    // 2nd
    const choicesOfQuestionElement2: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement2 = choicesOfQuestionElement2[2];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement2);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });
    // 3rd
    const choicesOfQuestionElement3: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement3 = choicesOfQuestionElement3[3];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement3);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });
    // 4th
    const choicesOfQuestionElement4: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement4 = choicesOfQuestionElement4[1];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement4);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });

    await waitFor(() => {
      const feedbackMessageElement: HTMLParagraphElement = screen.getByText(/you rock/i);
      expect(feedbackMessageElement).toBeInTheDocument();
    });
  });
  test('should not show "You Rock!" when user don"t get all questions answers correctly', async () => {
    const nextQuestionButtonElement: HTMLButtonElement = screen.getByRole('button', { name: /next question/i });
    // 1st
    const choicesOfQuestionElement: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement = choicesOfQuestionElement[1];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });
    // 2nd
    const choicesOfQuestionElement2: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement2 = choicesOfQuestionElement2[2];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement2);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });
    // 3rd
    const choicesOfQuestionElement3: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement3 = choicesOfQuestionElement3[3];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement3);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });
    // 4th
    const choicesOfQuestionElement4: HTMLLIElement[] = screen.getAllByRole('listitem');

    const choiceSelectedElement4 = choicesOfQuestionElement4[1];

    await waitFor(() => {
      userEvent.click(choiceSelectedElement4);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });

    await waitFor(() => {
      const feedbackMessageElement: HTMLParagraphElement | null = screen.queryByText(/you rock/i);
      expect(feedbackMessageElement).not.toBeInTheDocument();
    });
  });
});
