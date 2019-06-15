/**
 * Created by Андрей on 15.06.2019.
 */
function THashStorage(type) {
  this.storage = {};
  this.type = type;

  this.reset = function () {
    if (!localStorage[this.type]) {
      localStorage.setItem(this.type, JSON.stringify(this.storage))
    } else {
      this.storage = JSON.parse(localStorage.getItem(this.type));
    };
  };

  this.addValue = function (key, value) {
    this.storage[key] = value;
    localStorage.setItem(this.type, JSON.stringify(this.storage));
  };

  this.getValue = function (key) {
    if (this.storage[key]) {
      return this.storage[key];
    }
  };

  this.deleteValue = function (key) {
    if (this.storage[key]) {
      delete this.storage[key];
      localStorage.setItem(this.type, JSON.stringify(this.storage));
      return true;
    }
    return false;
  };

  this.getKeys = function () {
    return Object.keys(this.storage);
  };
};
