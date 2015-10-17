# hashtable

> Hash table data structure implementation in JavaScript. Stores entries in *buckets* based on hashing function.

# Install

```bash
npm install hashtablejs
```

```bash
bower install hashtable
```

# Usage

```javascript
const HashTable = require('hashtablejs');

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function hashCode(point) {
  return `Point:${point.x},${point.y}`;
}

function equals(pointA, pointB) {
  return (pointA.x === pointB.x &&
          pointA.y === pointB.y &&
          pointA.z === pointB.z);
}

var ht = new HashTable(hashCode, equals);

console.log(ht.put(new Point(2,3), 'red')); // undefined
console.log(ht.has(new Point(2,3)); // true
console.log(ht.get(new Point(2,3)); // 'red'
console.log(ht.put(new Point(8,9), 'blue')); // undefined
console.log(ht.size()); // 2
console.log(ht.remove(new Point(8,9))); // 'blue'
console.log(ht.clear()); // true
console.log(ht.size()); // 0
```

# API

```javascript
HashTable(hashCodeFn, equalsFn);
Hashtable.has(key);
Hashtable.put(key, value);
Hashtable.get(key);
Hashtable.remove(key);
Hashtable.size();
Hashtable.clear();
Hashtable.entries();
Hashtable.values();
Hashtable.keys();
Hashtable.each(fn);
```

# Test

```bash
npm test
```

# License

MIT
