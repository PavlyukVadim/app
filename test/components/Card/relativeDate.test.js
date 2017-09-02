import { expect, assert } from 'chai';
import relativeDate from '../../../app/components/Card/relativeDate';

describe('relativeDate', () => {
  
  beforeAll(() => {
    Date.prototype.toIsoString = function() {
      const tzo = -this.getTimezoneOffset();
      const dif = tzo >= 0 ? '+' : '-';
      const pad = function(num) {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
      return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
    }
  });

  afterAll(() => {
    Date.prototype.toIsoString = undefined;
  });

  describe('content', () => {
    it('should return just now', () => {
      expect(relativeDate((new Date()).toIsoString())).to.have.string('just now');
    });

    it('should return month and year', () => {
      const date = new Date();
      date.setFullYear(1997);
      const isoStringDate = date.toIsoString();  
      assert.match(relativeDate(isoStringDate), /^on \d{1,2} \w+ \d{4}/, 'regexp matches');
    });
  });
});
