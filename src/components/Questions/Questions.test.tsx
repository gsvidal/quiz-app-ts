import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Questions } from './Questions';
import { quiz } from '../../mocks/questions';
import { QuestionsProps } from './Questions';

const mockFn = jest.fn();

const questionsProps: QuestionsProps = {
  questions: quiz.questions,
  setShowResults: mockFn,
  setResults: mockFn,
};
beforeEach(() => {
  render(<Questions {...questionsProps} />);
});

describe('Questions', () => {
  test('should show first question when renders', () => {
    const firstQuestionElement: HTMLHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: questionsProps.questions[0].question,
    });
    expect(firstQuestionElement).toBeInTheDocument();
  });
  test('should render four possible answers(choices)', () => {
    const choicesListElement: HTMLLIElement[] = screen.getAllByRole('listitem');
    expect(choicesListElement.length).toBe(4);
  });
  // const randomQuestionIndex = Math.floor(Math.random() * (quizProps.quiz.questions.length + 1));
  test('should show first question with its possible answers(choices)', () => {
    const firstQuestionElement: HTMLHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: questionsProps.questions[0].question,
    });
    const firstQuestionChoices: string[] = questionsProps.questions[0].choices;
    const choicesListElement: HTMLLIElement[] = screen.getAllByRole('listitem');
    const choicesValues: (string | null)[] = choicesListElement.map((el) => el.textContent);

    expect(firstQuestionElement).toBeInTheDocument();
    expect(firstQuestionChoices).toStrictEqual(choicesValues);
  });
  test('should show first question with its choices and after selecting a choice and clicking next question button, should show next question with its respective choices', async () => {
    const firstQuestionElement: HTMLHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: questionsProps.questions[0].question,
    });
    const firstQuestionChoices: string[] = questionsProps.questions[0].choices;
    const choicesListElement: HTMLLIElement[] = screen.getAllByRole('listitem');
    const choicesValues: (string | null)[] = choicesListElement.map((el) => el.textContent);
    const nextQuestionButtonElement: HTMLButtonElement = screen.getByRole('button', { name: /next question/i });

    expect(firstQuestionElement).toBeInTheDocument();
    expect(firstQuestionChoices).toStrictEqual(choicesValues);
    expect(nextQuestionButtonElement).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(choicesListElement[0]);
    });
    await waitFor(() => {
      userEvent.click(nextQuestionButtonElement);
    });

    const firstQuestionElementAfterClick: HTMLHeadingElement | null = screen.queryByRole('heading', {
      level: 2,
      name: questionsProps.questions[0].question,
    });
    const choicesListElementAfterClick: HTMLLIElement[] | null = screen.queryAllByRole('listitem');
    const choicesValuesAfterClick: (string | null)[] = choicesListElementAfterClick.map((el) => el.textContent);
    expect(firstQuestionElementAfterClick).not.toBeInTheDocument();
    expect(firstQuestionChoices).not.toStrictEqual(choicesValuesAfterClick);
  });

  test('should show "Finish" text in the button instead of "Next" in last question', async () => {
    const nextQuestionButtonElement: HTMLButtonElement = screen.getByRole('button', { name: /next question/i });

    for (let i = 0; i < questionsProps.questions.length - 1; i++) {
      const choicesOfQuestionElement: HTMLLIElement[] = screen.getAllByRole('listitem');
      const choiceSelectedElement = choicesOfQuestionElement[0];

      await waitFor(() => {
        userEvent.click(choiceSelectedElement);
      });
      await waitFor(() => {
        userEvent.click(nextQuestionButtonElement);
      });
    }
    expect(nextQuestionButtonElement.textContent).toBe('Finish');
  });
});
