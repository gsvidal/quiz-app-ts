import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Quiz } from './Quiz';
import { QuizProps } from './Quiz';

const quizProps: QuizProps = {
  quiz: {
    topic: 'Javascript',
    level: 'Beginner',
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [
      {
        question: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
        type: 'MCQs',
        correctAnswer: 'stringify()',
      },
      {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        choices: ['var', 'let', 'var and let', 'None of the above'],
        type: 'MCQs',
        correctAnswer: 'var and let',
      },
      {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choices: ['document.write()', 'console.log()', 'window.alert', 'All of the above'],
        type: 'MCQs',
        correctAnswer: 'All of the above',
      },
      {
        question: 'How can a datatype be declared to be a constant type?',
        choices: ['const', 'var', 'let', 'constant'],
        type: 'MCQs',
        correctAnswer: 'const',
      },
    ],
  },
};

beforeEach(() => {
  render(<Quiz {...quizProps} />);
});

describe('Quiz', () => {
  test('should show Frontend Quiz heading', () => {
    const headingElement: HTMLHeadingElement = screen.getByRole('heading', { level: 1, name: /frontend quiz/i });
    expect(headingElement).toBeInTheDocument();
  });
  test('should show first question when renders', () => {
    const firstQuestionElement: HTMLHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: quizProps.quiz.questions[0].question,
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
      name: quizProps.quiz.questions[0].question,
    });
    const firstQuestionChoices: string[] = quizProps.quiz.questions[0].choices;
    const choicesListElement: HTMLLIElement[] = screen.getAllByRole('listitem');
    const choicesValues: (string | null)[] = choicesListElement.map((el) => el.textContent);

    expect(firstQuestionElement).toBeInTheDocument();
    expect(firstQuestionChoices).toStrictEqual(choicesValues);
  });
  test('should show first question with its choices and after clicking next question button, should show next question with its respective choices', async () => {
    const firstQuestionElement: HTMLHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: quizProps.quiz.questions[0].question,
    });
    const firstQuestionChoices: string[] = quizProps.quiz.questions[0].choices;
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
      name: quizProps.quiz.questions[0].question,
    });
    const choicesListElementAfterClick: HTMLLIElement[] | null = screen.queryAllByRole('listitem');
    const choicesValuesAfterClick: (string | null)[] = choicesListElementAfterClick.map((el) => el.textContent);
    expect(firstQuestionElementAfterClick).not.toBeInTheDocument();
    expect(firstQuestionChoices).not.toStrictEqual(choicesValuesAfterClick);
  });
  test('should render next question after click on next question button', () => {});
});
