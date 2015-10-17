const test = require('tape');
const Hashtable = require('../hashtable');

test('Hashtable', function (t) {
  'use strict';

  t.plan(17);

  function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  function hashCode(point) {
    return `Point:${point.x},${point.y}`;
  }

  function equals(pointA, pointB) {
    return (pointA.x === pointB.x &&
            pointA.y === pointB.y &&
            pointA.z === pointB.z);
  }

  const ht = new Hashtable(hashCode, equals);

  t.equal(ht._hashCode(new Point(2,3)), 'Point:2,3');
  t.equal(ht.put(new Point(2,3), 'yellow'), undefined);
  t.equal(ht.has(new Point(2,3)), true);
  t.equal(ht.has(new Point(1,2)), false);
  t.equal(ht.put(new Point(2,3), 'red'), 'yellow');
  t.equal(ht.put(new Point(2,3,5), 'green'), undefined);
  t.equal(ht.get(new Point(2,3)), 'red');
  t.equal(ht.size(), 2);
  t.equal(ht.put(new Point(8,9), 'blue'), undefined);
  t.equal(ht.size(), 3);

  const result = [];
  ht.each(function(key, value) {
    result.push([key, value]);
  });

  t.deepEqual(result, [[{ x: 2, y: 3, z: undefined },'red'],[{ x: 2, y: 3, z: 5 },'green'],[{ x: 8, y: 9, z: undefined },'blue']]);
  t.deepEqual(ht.keys(), [{ x: 2, y: 3, z: undefined }, { x: 2, y: 3, z: 5 }, { x: 8, y: 9, z: undefined }]);
  t.deepEqual(ht.values(), ['red','green','blue']);
  t.equal(ht.remove(new Point(8,9)), 'blue');
  t.equal(ht.size(), 2);
  t.equal(ht.clear(), true);
  t.equal(ht.size(), 0);
});
