/**
 * Created by Андрей on 24.04.2019.
 */
function getNet(row, col) {
  var str = "";

  for (var i = 0; i < col; i++) {
    for (var j = 0; j < (row / 2); j++) {
      if (i % 2 == 0) {
        str += "# ";
      } else {
        str += " #";
      };
    };

    if (row % 2 != 0) {
      str = str.slice(0, -1);
    };

    str += " \n";
  };
  return str;
};