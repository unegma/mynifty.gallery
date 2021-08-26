import React from 'react';
import moonImg from "../images/moontexture.png";
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";

export default function Moon(): JSX.Element {
  let texture = useLoader(THREE.TextureLoader, moonImg);
  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(5, 5);

  return (
    <mesh position={[0, 100, -40]}>
      <sphereBufferGeometry attach="geometry" args={[4, 24, 24]} />
      <meshStandardMaterial color={"white"} attach="material" map={texture} />
    </mesh>
  )
}
