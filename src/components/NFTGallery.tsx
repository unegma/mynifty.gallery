import React, {Suspense} from "react";
import {RayGrab} from "@react-three/xr";
import Image3D from "./Image3D";

export default function NFTGallery ({gallery, vrMode, displayMode, handleOpen, shape}: any) {
  return (
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
  )
}