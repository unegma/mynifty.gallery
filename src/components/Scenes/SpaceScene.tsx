import React, {Suspense} from "react";
import {PerspectiveCamera, Stars} from "@react-three/drei";
import Globe from "../Globe";

export default function ({handleYouClickedMe}: any) {

  return (
    <>
      <PerspectiveCamera position={[4, 7, 7]} makeDefault/>
      <pointLight intensity={3} position={[-90, -90, -100]}/>
      <color attach="background" args={['#000']}/>
      <ambientLight intensity={1}/>
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />

      <Suspense fallback={null}>
        <Globe name="The Sun" position={[0, -200, 190]} size={[4, 24, 24]} color="yellow"/>
      </Suspense>
      <Suspense fallback={null}>
        <Globe name="The Moon" handleYouClickedMe={handleYouClickedMe} position={[0, 100, -40]}
               size={[4, 24, 24]} color="white"/>
      </Suspense>
      <Suspense fallback={null}>
        <Globe name="The Red Planet" handleYouClickedMe={handleYouClickedMe} position={[-90, -90, -180]}
               size={[9, 24, 24]} color="#E3615C"/>
      </Suspense>
      <Suspense fallback={null}>
        <Globe name="The Blue Planet" handleYouClickedMe={handleYouClickedMe} position={[-90, -90, -220]}
               size={[4, 24, 24]} color="#728FAC"/>
      </Suspense>
    </>
  )
}