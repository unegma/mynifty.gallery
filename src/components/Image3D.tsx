import React, {Suspense, useEffect, useRef} from "react";
import * as THREE from "three";
import {useFrame, useLoader} from "@react-three/fiber";

/**
 *
 * @param image
 * @param handleOpen
 * @param displayMode - this will override pos[0,0,0] that is passed in
 * @param shape
 * @param index
 * @param pos
 * @param rotation
 * @param scale
 * @constructor
 */
export default function Image3D({image, handleOpen, displayMode, shape, index = 0, pos = [0, 0, 0], rotation = [0, 0, 0], scale = 1}: any): JSX.Element {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, image.thumbnail);

  let pos1 = pos[0], pos2 = pos[1], pos3 = pos[2];
  console.log(pos1, pos2, pos3);

  // if isplay mode (cluster etc) is set, get pos from the object instead
  // todo saying false because it is 0 // TODO REPLACE WITH ENUM
  if (typeof displayMode !== 'undefined' && displayMode !== null) {

    pos1 = image.displayMode[displayMode].pos1;
    pos2 = image.displayMode[displayMode].pos2;
    pos3 = image.displayMode[displayMode].pos3;

    // todo sort this
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
    rotation = [Math.PI / pos1, Math.PI / pos2, Math.PI / pos3];
    scale = image.scale;
  }

  return (
    <mesh
      // className="nft"
      ref={mesh}
      onClick={(event) => handleOpen(image) }
      position={[pos1, pos2, pos3]}
      rotation={rotation}
      scale={scale}>

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
