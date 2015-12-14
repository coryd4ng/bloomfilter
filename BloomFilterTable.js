var BloomFilterTable = function(n, p) {
  // Initialize storage.
  this.storage = [];
  // Calculate the optimal set size.
  this.max = Math.abs( ( n * Math.log(p) ) / ( Math.pow( Math.log(2), 2) ) );
  // Calculate the optimal number of hash functions.
  this.k = (this.max/n) * Math.log(2);
  // Object to store functions.
  this.func = {};

  for (var i = 0; i < this.k; i++) {
    this.func[i] = new HashFunction(i, this.max);
  } 

};

BloomFilterTable.prototype.insert = function(key) {

  for (var prop in this.func) {
    var i = this.func[prop].get(key);
    this.storage[i] = 1;
  }

};

BloomFilterTable.prototype.retrieve = function(key) {

  for (var prop in this.func) {
    var i = this.func[prop].get(key);
    if (this.storage[i] !== 1) {
        return false;
    }
  }
  return true;
  
};


/*
 ********** NOTE: **********
 * Do not edit this code unless you see a bug!
 */

// This is a "Hashing class". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`

var HashFunction = function(magic, max) {
    this.magic = magic;
    this.max = max;
};

HashFunction.prototype.get = function (key) {
  var hash = 5381;
  for (var i = 0; i < key.length; i++) {
    hash = hash * this.magic + key.charCodeAt(i);
  }

  return Math.floor(hash % this.max);
};
