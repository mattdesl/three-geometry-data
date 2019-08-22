# three-geometry-data

Returns individual vertex data from an indexed `THREE.Geometry` in ThreeJS.

This is useful to extract the normals, UV coordinates, colors, and positions of each vertex without losing the face ordering. By default, ThreeJS stores this data in such a way that it is difficult to, for example, iterate over each unique normal in a mesh.

```js
const getVertexData = require('three-geometry-data');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const { faces, attributes } = getVertexData(geometry);

// list all vertices
faces.forEach(([ a, b, c ]) => {
  // a THREE.Vector3
  console.log(attributes.position[a]);
  console.log(attributes.position[b]);
  console.log(attributes.position[c]);
});
```

Where `faces` is a listed of nested face indices for each triangle:

```js
[ [0, 2, 1], [2, 3, 1], ... ]
```

And `attributes` is an object with the named attributes in an array of Vectors, such as:

```js
{
  position: [ THREE.Vector3(0.5, 0.5, 0.5), ... ],
  normal: [ THREE.Vector3(1, 0, 0), ... ],
  uv: [ THREE.Vector2(0, 1), ... ]
}
```

If multiple sets of UVs exist, they will be named `uv`, then `uv1`, `uv2`, etc.

## Install

Use [npm](https://npmjs.com/) to install.

```sh
npm install three-geometry-data --save
```

## Usage

#### `{ faces, attributes } = getVertexData(geometry)`

Returns the `faces` and `attributes` of an indexed `THREE.Geometry` instance by unrolling the face data into arrays of Vector data.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-geometry-data/blob/master/LICENSE.md) for details.
