import React from 'react';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useLoader} from "@react-three/fiber";

export default function Room() {
  let { nodes, materials }: any = useLoader(GLTFLoader, 'https://assets.unegma.net/ark.unegma.work/cafe.gltf');

  return (
    <mesh material={materials.material_0} geometry={nodes.mesh_0.geometry} scale={[20,20,20]} />
  )
}
