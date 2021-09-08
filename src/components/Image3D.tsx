import React, {Suspense, useEffect, useRef} from "react";
import * as THREE from "three";
import {useFrame, useLoader} from "@react-three/fiber";

export default function Image3D({image, handleOpen, displayMode, shape, index = 0}: any): JSX.Element {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, image.thumbnail);

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

  let pos1 = 0, pos2 = 0, pos3 = 0;
  displayMode = Number.parseInt(displayMode); // may not be needed

  // todo this works without use effect, and I'm not sure why (ie switching from cluser to spiral)
  // useEffect(() => {
    pos1 = image.displayMode[displayMode].pos1;
    pos2 = image.displayMode[displayMode].pos2;
    pos3 = image.displayMode[displayMode].pos3;
  // }, [displayMode])

  return (
    <mesh
      // className="nft"
      ref={mesh}
      onClick={(event) => handleOpen(image) }
      position={[pos1, pos2, pos3]}
      rotation={[Math.PI / pos1, Math.PI / pos2, Math.PI / pos3]}
      scale={image.scale}>

      { shape === 'square' && (
        <planeBufferGeometry />
      )}

      { shape === 'disk' && (
        <circleBufferGeometry args={[0.5, 32, 32]} />
      )}

      { /* @ts-ignore */ }
      <meshStandardMaterial map={texture} attach="material" side={THREE.DoubleSide} />

    </mesh>
  )
}
