import React, {useRef, Suspense} from "react";
import {PerspectiveCamera, Stars, GizmoHelper, GizmoViewport} from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber';
import Image3D from "../Image3D";

let imgs = {
  brickSmall: "https://assets.unegma.net/shared/textures/brick3415-small.png",
  // plaqueSmall: "https://assets.unegma.net/shared/textures/plaque-small.png", // todo why doesnt this work?
  plaqueSmall3: "https://assets.unegma.net/shared/textures/plaque-small-3.png",
  floorSmall: "https://assets.unegma.net/shared/textures/carpet2319-small.png"
};


function Wall(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, imgs.brickSmall);

  return (
    <mesh
      className="wall"
      {...props}
      ref={mesh}
      receiveShadow
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial map={texture} attach="material" side={THREE.DoubleSide} />
    </mesh>
  )
}

function Floor(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, imgs.floorSmall);

  return (
    <mesh
      className="floor"
      {...props}
      ref={mesh}
      receiveShadow
      position={[0, -5, 5]}
      rotation={[1.55, 0, 0]}
      scale={[1, 1, 1]}
    >
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial map={texture} attach="material" side={THREE.DoubleSide} />
    </mesh>
  )
}

function Plaque(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, imgs.plaqueSmall3);
  let handleOpen = props.handleOpen;

  return (
    <mesh
      className="plaque"
      {...props}
      ref={mesh}
      onClick={(event) => handleOpen(props.image) }
      receiveShadow
      position={[0, -2, 0.1]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      <planeBufferGeometry args={[4, 1]} />
      <meshPhysicalMaterial map={texture} attach="material" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function ({gallery, vrMode, displayMode, handleOpen, shape}: any) {

  return (
    <>
      <ambientLight intensity={1} />
      <PerspectiveCamera position={[7, 5, 10]} makeDefault />
      {/*<pointLight intensity={3} position={[-90, -90, -100]} />*/}
      <color attach="background" args={['#000']} />

      {/*todo remove if in prod mode*/}
      {/*<GizmoHelper*/}
      {/*  alignment="bottom-right" // widget alignment within scene*/}
      {/*  margin={[80, 80]} // widget margins (X, Y)*/}
      {/*>*/}
      {/*  <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />*/}
      {/*</GizmoHelper>*/}

      { gallery && gallery.length
        ? gallery.map((image: any, index: number) => (
          <group position={[-index*10, 0, 0]} key={index} >

            <Suspense fallback={null}>
              <Wall />
            </Suspense>

            <Suspense fallback={null}>
              <Floor />
            </Suspense>

            {/*<mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>*/}
            {/*  <planeBufferGeometry args={[10, 10]} />*/}
            {/*  <meshPhysicalMaterial side={THREE.DoubleSide} color="#212529" />*/}
            {/*</mesh>*/}

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
                pos={[0,1,0.1]}
                index={index}
                className="pointer"
                image={image}
                handleOpen={handleOpen}
                shape={shape}
                scale={4}
              />
              <Plaque
                image={image}
                handleOpen={handleOpen}
              />
            </Suspense>

            {/*<mesh receiveShadow position={[0, -2, 0.1]}>*/}
            {/*  <planeBufferGeometry args={[3, 1]} />*/}
            {/*  <meshPhysicalMaterial side={THREE.DoubleSide} color="white" />*/}
            {/*</mesh>*/}
          </group>
        )) : <></>
      }
    </>
  )
}