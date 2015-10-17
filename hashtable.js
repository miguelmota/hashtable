(function(root) {
  'use strict';

  function Hashtable(hashCode, equals) {
    if (!(this instanceof Hashtable)) {
      return new Hashtable(hashCode, equals);
    }

    this._buckets = {};

    if (typeof hashCode === 'function') {
      this._hashCode = hashCode;
    }

    if (typeof equals === 'function') {
      this._equals = equals;
    }
  }

  Hashtable.prototype.put = function(key, value) {
    var previous;
    var hashedKey = this._hashCode(key);
    var bucket = this._getBucketForHash(hashedKey);

    if (bucket) {
      var bucketEntry = bucket.getEntryForKey(key, this._equals);

      if (bucketEntry) {
        previous = bucketEntry.value;
        bucketEntry.value = value;
      } else {
        bucket.addEntry(key, value);
      }
    } else {
      var bucket = new Bucket(hashedKey);
      bucket.addEntry(key, value);
      this._buckets[hashedKey] = bucket;
    }

    return previous;
  };

  Hashtable.prototype.get = function(key) {
    var hashedKey = this._hashCode(key);
    var result = null;

    var bucket = this._getBucketForHash(hashedKey);

    if (bucket) {
      var bucketEntry = bucket.getEntryForKey(key, this._equals);

      if (bucketEntry) {
        result = bucketEntry.value;
      }
    }

    return result;
  };

  Hashtable.prototype.has = function(key) {
    var hashedKey = this._hashCode(key);
    var bucket = this._getBucketForHash(hashedKey);

    if (bucket) {
      var bucketEntry = bucket.getEntryForKey(key, this._equals);

      if (bucketEntry) {
        return true;
      }
    }

    return false;
  };

  Hashtable.prototype.remove = function(key) {
    var hashedKey = this._hashCode(key);

    var bucket = this._getBucketForHash(hashedKey);

    if (bucket) {
      var bucketEntry = bucket.getEntryForKey(key, this._equals);

      if (bucketEntry) {
        var previous = bucket.removeEntryForKey(key, this._equals);

        if (bucket.entries.length === 0) {
          delete this._buckets[hashedKey];
        }

        if (previous) {
          return previous.value;
        }
      }
    }
  };

  Hashtable.prototype.clear = function() {
    this._buckets = {};
    return true;
  };

  Hashtable.prototype.size = function() {
    var size = 0;

    for (var hash in this._buckets) {
      size += this._buckets[hash].entries.length;
    }

    return size;
  };

  Hashtable.prototype.keys = function() {
    var entries = this.entries();
    var values = [];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      values.push(entry.key);
    }

    return values;
  };

  Hashtable.prototype.values = function() {
    var entries = this.entries();
    var values = [];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      values.push(entry.value);
    }

    return values;
  };

  Hashtable.prototype.each = function(fn) {
    var entries = this.entries();

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      fn(entry.key, entry.value);
    }
  };

  Hashtable.prototype.entries = function() {
    var entries = [];

    for (var key in this._buckets) {
      var bucket = this._buckets[key];
      entries = entries.concat(bucket.entries);
    }

    return entries;
  };

  Hashtable.prototype._hashCode = function(obj) {
    return obj.toString();
  };

  Hashtable.prototype._equals = function(objA, objB) {
    return objA.toString() === objB.toString();
  };

  Hashtable.prototype._getBucketForHash = function(hash) {
    return this._buckets[hash];
  };

  function Bucket(hash) {
    this.hash = hash;
    this.entries = [];
  }

  Bucket.prototype.addEntry = function(key, value) {
    this.entries.push({key: key, value: value});
  };

  Bucket.prototype.getEntryForKey = function(key, equals) {
    for (var i = 0; i < this.entries.length; i++) {
      var entry = this.entries[i];

      if (equals(entry.key, key)) {
        return entry;
      }
    }

    return null;
  };

  Bucket.prototype.removeEntryForKey = function(key, equals) {
    for (var i = 0; i < this.entries.length; i++) {
      var entry = this.entries[i];

      if (equals(entry.key, key)) {
        this.entries.splice(i, 1);
        return entry;
      }
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Hashtable;
    }
    exports.Hashtable = Hashtable;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Hashtable;
    });
  } else {
    root.Hashtable = Hashtable;
  }

})(this);
