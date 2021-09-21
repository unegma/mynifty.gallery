import React, {Suspense} from "react";
import {PerspectiveCamera, Stars} from "@react-three/drei";
import Globe from "../Globe";
import Room from "../Room";
import * as THREE from "three";

export default function () {

  return (
    <>
      <ambientLight intensity={3} />
      <PerspectiveCamera position={[10, 10, 10]} makeDefault />
      <pointLight intensity={3} position={[-90, -90, -100]} />
      <color attach="background" args={['#000']} />
      {/*<pointLight intensity={1.5} position={[5, 0, 5]} />*/}

      {/*<Suspense fallback={null}>*/}

      <mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <planeBufferGeometry args={[10, 10]} />
        <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />
      </mesh>

      {/*<mesh receiveShadow rotation={[1.065, 0, 0]} position={[0, -15, 0]}>*/}
        {/*<planeBufferGeometry attach="geometry" args={[9999, 9999]} />*/}
        {/*<circleBufferGeometry attach="geometry" args={[250, 250]}/>*/}
        {/*<meshPhysicalMaterial side={THREE.DoubleSide} clearcoat={1} attach="material" color="#212529" />*/}
      {/*</mesh>*/}

      {/*</Suspense>*/}
    </>
  )
}