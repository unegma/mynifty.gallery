import {Canvas, useLoader} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera, Stars} from "@react-three/drei";
import React, {Suspense, useEffect, useState} from "react";
import Image3D from "./Image3D";
import Globe from "./Globe";
import Grass from "./Grass";
import {RayGrab} from "@react-three/xr";
import { Source } from '../types/SourceEnum';
import Room from "./Room";

export default function MainCanvas({gallery, handleOpen, displayMode, scene, source, handleYouClickedMe, vrMode}: any) {

  const [shape, setShape] = useState('square');

  useEffect(() => {
    // todo change these to use enum/type or interface or whichever is the most recent correct typescript way
    if (source === Source.Wallet) {
      setShape('square');
    } else if (source === Source.POAP) {
      setShape('disk');
    }
  }, [source, shape, setShape]); // todo check these

  return (
    <>

      {/*todo use enum*/}
      { scene === 1 && (
        <>
          <PerspectiveCamera position={[4, 7, 7]} makeDefault />
          <pointLight intensity={3} position={[-90, -90, -100]} />
          <color attach="background" args={['#000']} />
          <ambientLight intensity={1} />
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
            <Globe name="The Moon" handleYouClickedMe={handleYouClickedMe} position={[0, 100, -40]} size={[4, 24, 24]} color="white"/>
          </Suspense>
          <Suspense fallback={null}>
            <Globe name="The Red Planet" handleYouClickedMe={handleYouClickedMe} position={[-90, -90, -180]} size={[9, 24, 24]} color="#E3615C"/>
          </Suspense>
          <Suspense fallback={null}>
            <Globe name="The Blue Planet" handleYouClickedMe={handleYouClickedMe} position={[-90, -90, -220]} size={[4, 24, 24]} color="#728FAC"/>
          </Suspense>
        </>
      )}

      {/*todo use enum*/}
      { scene === 2 && (
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
      )}

      { scene === 3 && (
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
      )}

      <group>
        {gallery && gallery.length
          ? gallery.map((image: any, index: number) => (
            <Suspense key={index} fallback={null}>
              { vrMode && (
                <RayGrab>
                  <Image3D
                    index={index}
                    displayMode={displayMode}
                    className="pointer"
                    image={image}
                    handleOpen={handleOpen}
                    shape={shape}
                  />
                </RayGrab>
              )}

              { !vrMode && (
                <Image3D
                  index={index}
                  displayMode={displayMode}
                  className="pointer"
                  image={image}
                  handleOpen={handleOpen}
                  shape={shape}
                />
              )}

            </Suspense>
          ))
          : <></> }
      </group>

    </>
  )
}
