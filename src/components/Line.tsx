import React, {useRef} from 'react';
import * as THREE from 'three';

export default function Line(): JSX.Element {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 1]}
      rotation={[1, 9, 30]}
    >
      <boxGeometry args={[9999, 0.1, 0.1]} />
      <meshStandardMaterial color={'white'} />
    </mesh>
  )
}
