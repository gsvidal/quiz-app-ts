import './Quiz.module.css';
import { QuizObj } from '../../mocks/questions';
import { Questions } from '../Questions/Questions';

export type QuizProps = {
  quiz: QuizObj;
};

export const Quiz = ({ quiz }: QuizProps): JSX.Element => {
  const { questions } = quiz;

  return (
    <>
      <h1>FrontEnd Quiz</h1>
      <Questions questions={questions} />
    </>
  );
};
