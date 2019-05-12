var John = {
  bills: [124, 48, 268, 180, 42],
  tips: [],
  finalAmounts: [],
  getTip: function () {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 50) {
        this.tips.push(+(this.bills[i] * 0.2).toFixed(2));
        this.finalAmounts.push(this.tips[i] + this.bills[i]);
      } else if (50 < this.bills[i] && this.bills[i] < 200) {
        this.tips.push(+(this.bills[i] * 0.15).toFixed(2));
        this.finalAmounts.push(this.tips[i] + this.bills[i]);
      } else {
        this.tips.push(+(this.bills[i] * 0.1).toFixed(2));
        this.finalAmounts.push(this.tips[i] + this.bills[i]);
      }
    }
  }
};

John.getTip();

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

function calculateAverageTips(arrTips) {
  if (!Array.isArray(arrTips) || arrTips.length === 0) {
    return 'Вам следует хотя бы раз сходить в ресторан';
  }
  var sumTips = 0;
  for (var i = 0; i < arrTips.length; i++) {
    sumTips += arrTips[i];
  }
  return (sumTips / arrTips.length);
}

function logHighestTips(average1, average2, name1, name2) {
 	if (average1 > average2) {
 		console.log(name1 + "'s" + " family paid highest tips");
 	}
 	console.log(name2 + "'s" + " family paid highest tips");
 }

var averageTipJohn = calculateAverageTips(John.tips);
var averageTipMark = calculateAverageTips(Mark.tips);

logHighestTips(averageTipJohn, averageTipMark, 'John', 'Mark');

module.exports = calculateAverageTips;