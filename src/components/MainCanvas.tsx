import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera, Stars} from "@react-three/drei";
import React, {Suspense, useEffect, useState} from "react";
import Image3D from "./Image3D";
import Globe from "./Globe";
import Grass from "./Grass";

export default function MainCanvas({gallery, handleOpen, displayMode, scene, source}: any) {

  const [shape, setShape] = useState('square');

  useEffect(() => {
    // todo change these to use enum/type or interface or whichever is the most recent correct typescript way
    if (source === 1) {
      setShape('square');
    } else if (source === 2) {
      setShape('disk');
    }
  }, [source, shape, setShape]); // todo check these

  return (
    <>
      {/*<PerspectiveCamera position={[4, 4, 7]} makeDefault />*/}
      <PerspectiveCamera position={[4, 7, 7]} makeDefault />
      {/*<pointLight intensity={3} position={[-90, -90, -180]} />*/}
      <pointLight intensity={3} position={[-90, -90, -100]} />

      {/* Lights*/}
      {/*<rectAreaLight*/}
      {/*  intensity={3}*/}
      {/*  position={[5, 0, 5]}*/}
      {/*  rotation={[0, 0, 0]}*/}
      {/*  width={50}*/}
      {/*  height={50}*/}
      {/*/>*/}

      { scene === 1 && (
        <color attach="background" args={['#000']} />
      )}

      { scene === 2 && (
        <>
          <color attach="background" args={['#6E9EF1']} />
          <pointLight intensity={1.5} position={[5, 0, 5]} />
          <Suspense fallback={null}>
            <Grass/>
          </Suspense>
        </>
      )}

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
              <Image3D displayMode={displayMode} className="pointer" image={image} handleOpen={handleOpen} shape={shape}/>
            </Suspense>
          ))
          : <></> }
      </group>


      { scene === 1 && (
        <>
        <ambientLight intensity={1} />
          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
        </>
      )}

      { scene === 2 && (
        <>
          <ambientLight intensity={3} />
        </>
      )}

      <Suspense fallback={null}>
        <Globe name="The Moon" position={[0, 100, -40]} size={[4, 24, 24]} color="white"/>
      </Suspense>

      <Suspense fallback={null}>
        <Globe name="The Red Planet" position={[-90, -90, -180]} size={[9, 24, 24]} color="#E3615C"/>
      </Suspense>

      <Suspense fallback={null}>
        <Globe name="The Blue Planet" position={[-90, -90, -220]} size={[4, 24, 24]} color="#728FAC"/>
      </Suspense>

      {/*sun*/}
      
      {/*<rectAreaLight*/}
      {/*  intensity={9}*/}
      {/*  position={[0, -290, 190]}*/}
      {/*  rotation={[0, 0, 0]}*/}
      {/*  width={50}*/}
      {/*  height={50}*/}
      {/*/>*/}
      {/*<pointLight intensity={3} position={[0, -280, 180]}  />*/}

    { scene === 1 && (
      <Suspense fallback={null}>
        <Globe name="The Sun" position={[0, -290, 190]} size={[4, 24, 24]} color="yellow"/>
      </Suspense>
    )}

    { scene === 2 && (
      <Suspense fallback={null}>
        <Globe name="The Sun" position={[0, 290, 0]} size={[4, 24, 24]} color="yellow"/>
      </Suspense>
    )}
  </>
  )
}
