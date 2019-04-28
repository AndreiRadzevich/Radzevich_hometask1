const calculateAverageTips = require('./tips');

var Mark = {
  bills: [77, 375, 110, 45],
  tips: [],
  finalAmounts: [],
  getTip: function () {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 100) {
        this.tips.push(+(this.bills[i] * 0.2).toFixed(2));
        this.finalAmounts.push(this.tips[i] + this.bills[i]);
      } else if (100 < this.bills[i] && this.bills[i] < 300) {
        this.tips.push(+(this.bills[i] * 0.1).toFixed(2));
        this.finalAmounts.push(this.tips[i] + this.bills[i]);
      } else {
        this.tips.push(+(this.bills[i] * 0.25).toFixed(2));
        this.finalAmounts.push(this.tips[i] + this.bills[i]);
      }
    }
  }
};

Mark.getTip();

describe('calculateAverageTips', () => {
  test('returns the correct number', () => {
    expect(calculateAverageTips(Mark.tips)).toBe(32.2875);
  });
  test('returns error message', () => {
    expect(calculateAverageTips(85)).toBe('Вам следует хотя бы раз сходить в ресторан');
  });
});