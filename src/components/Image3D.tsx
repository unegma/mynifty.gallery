import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame, useLoader} from "@react-three/fiber";

export default function Image3D(props: any): JSX.Element {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, props.image.thumbnail);

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

  let handleOpen = props.handleOpen;

  return (
    <mesh
      className="nft"
      {...props}
      ref={mesh}
      onClick={(event) => handleOpen(props.image) }
      position={[props.image.pos1, props.image.pos2, props.image.pos3]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[1, 1, 1]}>
      <planeBufferGeometry />

      { /* @ts-ignore */ }
      <meshStandardMaterial map={texture} attach="material" side={THREE.DoubleSide} />

    </mesh>


  )
}
