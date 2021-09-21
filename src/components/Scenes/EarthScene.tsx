import React, {Suspense} from "react";
import {PerspectiveCamera, Stars} from "@react-three/drei";
import Globe from "../Globe";
import Grass from "../Grass";

export default function ({handleYouClickedMe}: any) {

  return (
    <>
        <ambientLight intensity={3} />
        <PerspectiveCamera position={[4, 7, 7]} makeDefault />
        <pointLight intensity={3} position={[-90, -90, -100]} />
        <color attach="background" args={['#6E9EF1']} />
        <pointLight intensity={1.5} position={[5, 0, 5]} />
        <Suspense fallback={null}>
            <Grass/>
        </Suspense>

        <Suspense fallback={null}>
            <Globe name="The Sun" position={[0, 200, 0]} size={[4, 24, 24]} color="yellow"/>
        </Suspense>
        <Suspense fallback={null}>
            <Globe name="The Moon" handleYouClickedMe={handleYouClickedMe} position={[0, 100, -40]} size={[4, 24, 24]} color="white"/>
        </Suspense>
    </>
  )
}