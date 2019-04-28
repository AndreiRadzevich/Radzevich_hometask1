/**
 * Created by Андрей on 24.04.2019.
 */
function removeCLass(obj, cls) {
  var arr = obj.className.split(' ');
  var arr1 = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== cls) {
      arr1.push(arr[i]);
    };
  };
    obj.className = arr1.join(" ");
};