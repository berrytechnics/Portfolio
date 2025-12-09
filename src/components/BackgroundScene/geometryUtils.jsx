// Geometry helper function
export function getGeometry(shape, size) {
  switch (shape) {
    case "d4":
      return <tetrahedronGeometry args={[size, 0]} />;
    case "d6":
      return <boxGeometry args={[size, size, size]} />;
    case "d8":
      return <octahedronGeometry args={[size, 0]} />;
    case "d12":
      return <dodecahedronGeometry args={[size, 0]} />;
    case "d20":
      return <icosahedronGeometry args={[size, 0]} />;
    default:
      return <boxGeometry args={[size, size, size]} />;
  }
}

