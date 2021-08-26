import React from "react";
import grassImg from "../images/grasstexture.jpg";
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";

export default function Grass(): JSX.Element {
  const texture = useLoader(THREE.TextureLoader, grassImg);
  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(5, 5);

  return (
    <mesh receiveShadow rotation={[1.065, 0, 0]} position={[0, -15, 0]}>
      {/*<planeBufferGeometry attach="geometry" args={[9999, 9999]} />*/}
      <circleBufferGeometry attach="geometry" args={[250, 250]}/>
      <meshPhysicalMaterial side={THREE.DoubleSide} clearcoat={1} attach="material" color="#212529" map={texture}/>
    </mesh>
  )
}
