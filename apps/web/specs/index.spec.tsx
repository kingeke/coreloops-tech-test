import { render } from '@testing-library/react';

import Page from '../src/app/page';

describe('Page', () => {
  it('should throw NEXT_REDIRECT', () => {
    try {
      render(<Page />);
      fail('Expected NEXT_REDIRECT to be thrown');
    } catch (err) {
      expect((err as { message: string }).message).toMatch('NEXT_REDIRECT');
    }
  });
});
