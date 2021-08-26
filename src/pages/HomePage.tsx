import React, { useRef, useState, Suspense } from 'react';
import classes from './homePage.module.scss';
import Moon from "../components/Moon";
import {Html, OrbitControls, PerspectiveCamera, Sphere, Stars, Text} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import Grass from "../components/Grass";
import Line from "../components/Line";
import Image3D from "../components/Image3D";
import {Typography} from "@material-ui/core";

export default function HomePage(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({name: "", description: "", url: ""});

  const handleOpen = (image: any) => {
    setOpen(true);
    setSelectedImage(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gallery = [
    { url: "https://upload.wikimedia.org/wikipedia/en/3/3c/PinkFloyd-album-piperatthegatesofdawn_300.jpg", pos1: 0, pos2: 1, pos3: 4, name: "Piper at the Gates of Dawn", description: "The Piper at the Gates of Dawn is the debut album by English rock band Pink Floyd, the only album made under founding member Syd Barrett's leadership."},
    { url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png", pos1: 0, pos2: 0.5, pos3: 1, name: "Dark Side of the Moon", description: "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records."},
    { url: "https://upload.wikimedia.org/wikipedia/en/7/74/Pink_Floyd-Animals-Frontal.jpg", pos1: 0, pos2: -2, pos3:-2, name: "Animals", description: "Animals is the tenth studio album by the English rock band Pink Floyd, released on 21 January 1977 through Harvest and Columbia Records."},
    { url: "https://upload.wikimedia.org/wikipedia/en/1/13/PinkFloydWallCoverOriginalNoText.jpg", pos1: -1.5, pos2: -4, pos3:-7, name: "The Wall", description: "The Wall is the eleventh studio album by the English rock band Pink Floyd, released on 30 November 1979 by Harvest and Columbia Records." }
  ]

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Timeline Example
      </Typography>
      <Canvas className="timeline-canvas">
        {/*<PerspectiveCamera position={[4, 4, 7]} makeDefault />*/}
        <PerspectiveCamera position={[4, 7, 7]} makeDefault />
        <pointLight intensity={2} position={[5, 0, 5]} />

        {/* Lights */}
        {/*<rectAreaLight*/}
        {/*  intensity={3}*/}
        {/*  position={[5, 0, 5]}*/}
        {/*  rotation={[0, 0, 0]}*/}
        {/*  width={50}*/}
        {/*  height={50}*/}
        {/*/>*/}

        <color attach="background" args={['#000']} />

        <Suspense fallback={null}>
          <Grass />
        </Suspense>

        <group>
          <group>
            {/*<Date date={1967} position={[-1,2,5]} rotation={[0,60,0]}></Date>*/}
            {/*<Date date={1977} position={[-2.5,-3,-5]} rotation={[0,0,0]}></Date>*/}
            <Line/>
          </group>

          {gallery && gallery.length
            ? gallery.map((image: any, index: number) => (

              <Suspense key={index} fallback={null}>
                <Image3D image={image} handleOpen={handleOpen}/>
              </Suspense>
            ))
            : <></> }
        </group>
        <ambientLight intensity={1} />

        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />


        <OrbitControls enableZoom={false} />

        <Suspense fallback={null}>
          <Moon />
        </Suspense>

      </Canvas>
    </div>
  )
}
