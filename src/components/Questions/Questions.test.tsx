import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Questions } from './Questions';
import { quiz } from '../../mocks/questions';
import { QuestionsProps } from './Questions';

const mockFn = jest.fn();

const questionsProps: QuestionsProps = {
  questions: quiz.questions,
  setIsResultsShown: mockFn,
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
  test('should show first question with its choices and after clicking next question button, should show next question with its respective choices', async () => {
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

    // act(() => {
    //   userEvent.click(nextQuestionButtonElement);
    // });
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

  test('should show 5 points on score for each correct answer', () => {});
});
