function THashStorage() {
	this.storage = {};
}

THashStorage.prototype.addValue = function (key, value) {
	this.storage[key] = value;
};

THashStorage.prototype.getValue = function (key) {
	if (this.storage[key]) {
		return this.storage[key];
	}
};

THashStorage.prototype.deleteValue = function (key) {
	if (this.storage[key]) {
		delete this.storage[key];
		return true;
	}
	return false;
};

THashStorage.prototype.getKeys = function () {
	return Object.keys(this.storage);
};