import React, {Suspense} from "react";
import {PerspectiveCamera, Stars} from "@react-three/drei";
import * as THREE from "three";
import Image3D from "../Image3D";
import {Vector3} from "three";

export default function ({gallery, vrMode, displayMode, handleOpen, shape}: any) {


  function createSquareSpiral(index: any, returnArray: boolean = false): any {

    // n-4*k^2

    let x = Math.sin(  Math.PI/2 * Math.sqrt(4*index-3)  )
    let z = Math.cos(  Math.PI/2 * Math.sqrt(4*index-3)  )

    x = x*20;
    z = z*20;

    return [x, 0, z];

    // // https://www.reddit.com/r/theydidthemath/comments/286tqb/3d_golden_spiral_equation/
    // const exponent = 0.306349; // growth factor in Radians: `ln(phi)/(pi/2)` OR in Degrees: `ln(phi)/90`
    // const exponent = 0.1; // growth factor in Radians: `ln(phi)/(pi/2)` OR in Degrees: `ln(phi)/90`
    //
    // const angle = index; // theta
    // // const angle = (index + 0.1) * (Math.round(Math.random()) * 2 - 1) ;// theta
    //
    // const slope = 0.2;
    // const t = index - index / 2; // todo what is t?
    //
    // let pos1 = Math.exp(exponent) * angle * Math.sin(angle);
    // let pos2 = index * (slope * angle) / (index * Math.sqrt(index));
    // let pos3 = Math.exp(exponent) * angle * Math.cos(angle);
    //
    // if (returnArray) {
    //   console.log(`Index: ${index}, Pos: ${pos1} ${pos2} ${pos3}`);
    //
    //   return [pos1, pos2, pos3];
    // } else {
    //   return {
    //     pos1: pos1,
    //     pos2: pos2,
    //     pos3: pos3
    //   };
    // }
  }

  return (
    <>
      <ambientLight intensity={2} />
      <PerspectiveCamera position={[10, 10, 10]} makeDefault />
      <pointLight intensity={3} position={[-90, -90, -100]} />
      <color attach="background" args={['#000000']} />

      { gallery && gallery.length
        ? gallery.map((image: any, index: number) => {

          let myPos = createSquareSpiral(index+1, true);
          console.log(`My Position: ${myPos}`)

          return (
          // <group position={[-index*7, 0, 0]} key={index} >
          <group position={myPos} key={index}>


            <mesh receiveShadow rotation={[0, 0, 0]} position={[0, -2, 0]}>
              <boxBufferGeometry args={[5, 2, 5]}/>
              <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529"/>
            </mesh>

            {/*<mesh receiveShadow rotation={[1.55, 0, 0]} position={[0, -5, 5]}>*/}
            {/*  <planeBufferGeometry args={[10, 10]} />*/}
            {/*  <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />*/}
            {/*</mesh>*/}

            {/*<mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>*/}
            {/*  <planeBufferGeometry args={[10, 10]} />*/}
            {/*  <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />*/}
            {/*</mesh>*/}

            <Suspense fallback={null}>
              <Image3D
                pos={[0, 1, 0]}
                index={index}
                className="pointer"
                image={image}
                handleOpen={handleOpen}
                shape={shape}
                scale={4}
                rotation={[0, 0, 0]}
                roty={0.01}
                rotyAxis={'y'}
              />
            </Suspense>

            {/*<mesh receiveShadow position={[0, -2, 0.1]}>*/}
            {/*  <planeBufferGeometry args={[3, 1]} />*/}
            {/*  <meshPhysicalMaterial side={THREE.DoubleSide} color="white" />*/}
            {/*</mesh>*/}
          </group>
          )}) : <></>
      }
    </>
  )
}