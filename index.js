module.exports = function getVertexData (geometry) {
  if (geometry.isBufferGeometry) {
    throw new Error('Expected THREE.Geometry, not THREE.BufferGeometry type');
  } else if (geometry.faces && geometry.faces.length > 0) {
    var mesh = {};
    mesh.vertices = newArray(geometry.vertices.length);
    mesh.faces = newArray(geometry.faces.length);
    var uvSets = geometry.faceVertexUvs;
    geometry.faces.forEach(function (face, faceIndex) {
      mesh.faces[faceIndex] = [ face.a, face.b, face.c ];
      push(geometry, mesh.vertices, face.a, face, 0, uvSets, faceIndex);
      push(geometry, mesh.vertices, face.b, face, 1, uvSets, faceIndex);
      push(geometry, mesh.vertices, face.c, face, 2, uvSets, faceIndex);
    });

    var result = {
      faces: mesh.faces,
      attributes: {}
    };
    mesh.vertices.forEach(function (vertex) {
      Object.keys(vertex).forEach(function (key) {
        if (!(key in result.attributes)) {
          result.attributes[key] = [];
        }
        var data = vertex[key];
        result.attributes[key].push(data);
      });
    });
    return result;
  } else {
    throw new Error('Expected geometry to have faces');
  }
};

// push vertex if it hasn't been added already
function push (geometry, array, vertexIndex, face, triangleIndex, uvSets, faceIndex) {
  if (array[vertexIndex] == null) {
    var vertex = {
      position: geometry.vertices[vertexIndex].clone()
    };
    if (face.vertexNormals && face.vertexNormals.length >= 3) {
      vertex.normal = face.vertexNormals[triangleIndex].clone();
    } else if (face.normal) {
      vertex.normal = face.normal.clone();
    }
    if (face.vertexColors && face.vertexColors.length >= 3) {
      vertex.color = face.vertexColors[triangleIndex].clone();
    }
    uvSets.forEach(function (uvSet, i) {
      var uvList = uvSet[faceIndex];
      var uv = uvList[triangleIndex];
      var key = i === 0 ? 'uv' : ('uv' + i);
      vertex[key] = uv.clone();
    });
    array[vertexIndex] = vertex;
  }
}

// build a new dense array
function newArray (len) {
  var arr = new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = undefined;
  }
  return arr;
}