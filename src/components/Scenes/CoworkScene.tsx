import React, {Suspense} from "react";
import {PerspectiveCamera, Stars} from "@react-three/drei";
import Globe from "../Globe";
import Room from "../Room";

export default function () {

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight intensity={1.5} position={[0, 0, 0]} />

      <Suspense fallback={null}>
        <PerspectiveCamera position={[7, 7, 7]} makeDefault />
        {/*<pointLight intensity={3} position={[-90, -90, -100]} />*/}
        <color attach="background" args={['#000']} />
        <Room />
      </Suspense>
    </>
  )
}