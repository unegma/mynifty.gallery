import React, {Suspense} from "react";
import {PerspectiveCamera, Stars} from "@react-three/drei";
import * as THREE from "three";
import Image3D from "../Image3D";

export default function ({gallery, vrMode, displayMode, handleOpen, shape}: any) {

  return (
    <>
      <ambientLight intensity={2} />
      <PerspectiveCamera position={[10, 10, 10]} makeDefault />
      <pointLight intensity={3} position={[-90, -90, -100]} />
      <color attach="background" args={['#000']} />

      { gallery && gallery.length
        ? gallery.map((image: any, index: number) => (
          <group position={[-index*5, 0, 0]} key={index} >
            <mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>
              <planeBufferGeometry args={[10, 10]} />
              <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />
            </mesh>

            <mesh receiveShadow rotation={[1.55, 0, 0]} position={[0, -5, 5]}>
              <planeBufferGeometry args={[10, 10]} />
              <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />
            </mesh>

            {/*<mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>*/}
            {/*  <planeBufferGeometry args={[10, 10]} />*/}
            {/*  <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />*/}
            {/*</mesh>*/}

            <Suspense fallback={null}>
              <Image3D
                pos={[0,1,0.1]}
                index={index}
                className="pointer"
                image={image}
                handleOpen={handleOpen}
                shape={shape}
                scale={4}
              />
            </Suspense>

            <mesh receiveShadow position={[0, -2, 0.1]}>
              <planeBufferGeometry args={[3, 1]} />
              <meshPhysicalMaterial side={THREE.DoubleSide} color="white" />
            </mesh>
          </group>
        )) : <></>
      }
    </>
  )
}