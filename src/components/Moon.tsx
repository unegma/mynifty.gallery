import React from 'react';
import moonImg from "../images/moontexture.png";
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";

export default function Moon({position, size, color}: any): JSX.Element {
  let texture = useLoader(THREE.TextureLoader, moonImg);
  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(5, 5);

  return (
    <mesh position={position}>
      <sphereBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial color={color} attach="material" map={texture} />
    </mesh>
  )
}
