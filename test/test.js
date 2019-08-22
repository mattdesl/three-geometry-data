const THREE = require('three');
const test = require('tape');
const getGeometryData = require('..');
const expected = require('./expected.json');

test('should get data', t => {
  const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
  const data = getGeometryData(geometry);
  t.deepEqual(JSON.parse(JSON.stringify(data)), expected);
  t.end();
});
