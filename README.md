# three-geometry-data

Returns individual vertex data from an indexed `THREE.Geometry` in ThreeJS.

This is useful to extract the normals, UV coordinates, colors, and positions of each vertex without losing the face ordering. By default, ThreeJS stores this data in such a way that it is difficult to, for example, iterate over each unique normal in a mesh.

```js
const getVertexData = require('three-geometry-data');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const { faces, vertices } = getVertexData(geometry);

vertices.forEach(vertex => {
  // each is a THREE.Vector3
  console.log(vertex.position, vertex.normal);
});
```

Where `faces` is a listed of nested face indices for each triangle:

```js
[ [0, 2, 1], [2, 3, 1], ... ]
```

And `vertices` contains a list of vertex objects, each containing the data stored in the geometry, for example:

```js
{
  normal: THREE.Vector3(1, 0, 0)
  position: THREE.Vector3(0.5, 0.5, 0.5)
  uv: THREE.Vector2(0, 1)
}
```

## Install

Use [npm](https://npmjs.com/) to install.

```sh
npm install three-geometry-data --save
```

## Usage

#### `{ faces, vertices } = getVertexData(geometry)`

Returns the `faces` and `vertices` of an indexed `THREE.Geometry` instance by unrolling the face data into an indexed array.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-geometry-data/blob/master/LICENSE.md) for details.
