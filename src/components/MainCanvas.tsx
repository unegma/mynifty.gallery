import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera, Stars} from "@react-three/drei";
import React, {Suspense} from "react";
import Image3D from "./Image3D";

export default function MainCanvas({gallery, zoomEnabled, handleOpen, displayMode}: any) {
  return (

    <Canvas className="timeline-canvas">
      {/*<PerspectiveCamera position={[4, 4, 7]} makeDefault />*/}
      <PerspectiveCamera position={[4, 7, 7]} makeDefault />
      <pointLight intensity={3} position={[5, 0, 5]} />

      {/* Lights */}
      {/*<rectAreaLight*/}
      {/*  intensity={3}*/}
      {/*  position={[5, 0, 5]}*/}
      {/*  rotation={[0, 0, 0]}*/}
      {/*  width={50}*/}
      {/*  height={50}*/}
      {/*/>*/}

      <color attach="background" args={['#000']} />

      {/*<Suspense fallback={null}>*/}
      {/*  <Grass />*/}
      {/*</Suspense>*/}

      <group>
        <group>
          {/*<Date date={1967} position={[-1,2,5]} rotation={[0,60,0]}></Date>*/}
          {/*<Date date={1977} position={[-2.5,-3,-5]} rotation={[0,0,0]}></Date>*/}
          {/*<Line color='white'position={[0, 0, 0]} geometry={[20, 0.1, 0.1]} rotation={[0, 0, 0]}/>*/}
          {/*<Line color='blue' position={[0, 0, 1]} geometry={[20, 0.1, 0.1]} rotation={[1, 7.9, 30]}/>*/}
        </group>

        {gallery && gallery.length
          ? gallery.map((image: any, index: number) => (

            <Suspense key={index} fallback={null}>
              <Image3D displayMode={displayMode} className="pointer" image={image} handleOpen={handleOpen}/>
            </Suspense>
          ))
          : <></> }
      </group>
      <ambientLight intensity={1} />

      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />


      <OrbitControls enableZoom={zoomEnabled} />

      <Suspense fallback={null}>
        {/*<Moon />*/}
      </Suspense>

    </Canvas>
  )
}
