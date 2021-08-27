import React, {useRef} from 'react';
import * as THREE from 'three';

type LineType = {
  color: any|undefined,
  position: any|undefined,
  rotation: any|undefined,
  geometry: any|undefined
}

export default function Line({color, position, rotation, geometry}: LineType): JSX.Element {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
    >
      <boxGeometry args={geometry} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
