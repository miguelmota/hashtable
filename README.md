# hashtable

> [Hashtable](https://en.wikipedia.org/wiki/Hash_table) data structure implementation in JavaScript.

Stores entries (key, value) in buckets based on hashcode.

[![Hash table](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/315px-Hash_table_3_1_1_0_1_0_0_SP.svg.png)](https://en.wikipedia.org/wiki/Hash_table)

<sup>[source](https://en.wikipedia.org/wiki/Hash_tabl)</sup>

# Install

```bash
npm install hashtablejs
```

```bash
bower install hashtable
```

# Usage

```javascript
const Hashtable = require('hashtablejs');

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function hashCode(point) {
  return `Point:${point.x},${point.y}`;
}

function equals(pointA, pointB) {
  return (pointA.x === pointB.x &&
          pointA.y === pointB.y);
}

var ht = new Hashtable(hashCode, equals);

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
Hashtable(hashCodeFn, equalsFn);
hashtable.has(key);
hashtable.put(key, value);
hashtable.get(key);
hashtable.remove(key);
hashtable.size();
hashtable.clear();
hashtable.entries();
hashtable.values();
hashtable.keys();
hashtable.each(fn);
```

# Test

```bash
npm test
```

# License

MIT
