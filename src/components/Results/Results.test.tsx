import { render, screen } from '@testing-library/react';
import { Results } from './Results';
//
// const resultsProps: TemplateProps = {
//
// };

beforeEach(() => {
  render(<Results />);
});

describe('Results', () => {
  test('should show Results title', () => {
    const titleResultsElement = screen.getByRole('heading', { level: 2, name: /results/i });
    expect(titleResultsElement).toBeInTheDocument();
  });
});
