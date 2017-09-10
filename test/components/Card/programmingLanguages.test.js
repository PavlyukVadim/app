import { expect, assert } from 'chai';
import programmingLanguages from '../../../app/components/Card/programmingLanguages';

describe('programmingLanguages', () => {
  describe('content', () => {
    it('should return color', () => {
      const language = 'JavaScript';
      assert.match(programmingLanguages[language], /^#[0-9a-f]{6}/, 'regexp matches');
    });
  });
});
