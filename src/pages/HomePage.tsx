import React, {useRef, useState, Suspense, useEffect} from 'react';
import './homePage.module.scss';
import classes from './homePage.module.scss';
import Moon from "../components/Moon";
import {Html, OrbitControls, PerspectiveCamera, Sphere, Stars, Text} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import Grass from "../components/Grass";
import Line from "../components/Line";
import Image3D from "../components/Image3D";
import {createStyles, makeStyles, Modal, Theme, Typography} from "@material-ui/core";
import {randFloat, randInt} from "three/src/math/MathUtils";


export default function HomePage(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [gallery, setGallery] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState({name: "", description: "", imageUrl: "", thumbnail: "",
    dateLost: "", lastPrice: ""
  });


  useEffect(() => {
    getAssets([]);
  }, []);

  async function getAssets(assetsArray: [], tempIndex = 0, offset = 0) {
    let assets;

    // desc seems to show the most recent
    assets = await fetch(`https://api.thegraph.com/subgraphs/name/knownorigin/known-origin`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query { tokens(orderBy: lastTransferTimestamp, orderDirection: desc, where: {currentOwner_in: [
            "0x000000000000000000000000000000000000dead", 
            "0x0000000000000000000000000000000000000000"
          ]}) {
            id
            lastSalePriceInEth
            lastTransferTimestamp
            metadata {
              name
              description
              image
              artist
              scarcity
              cover_image_size_in_bytes
              image_size_in_bytes
              cover_image
            }
          }}`
        }
      )
    });
    // assets = await fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=20&owner=0x0000000000000000000000000000000000000000`);
    assets = await assets.json();

    console.log('pulled assets:');
    console.log(assets);
    assets = assets.data.tokens;

    if (assets.length > 0) {
      let newAssets = assets.map((asset: any, index: number) => {

        let imageURL = asset.metadata.image;

        // console.log(imageURL);
        //ipfs://Qmb4zQH54vKrMrJZoku2zdCnELeQ5HArXmPEtQPf2qWPKk/asset.gif
        //https://ipfs.infura.io/ipfs/QmVdyHRUvKiQukpmHgFbrbkPey7F2fLrQPiM8xvNfELWCg

        if (imageURL == null || imageURL == "") {
          return null;
        }

        if (imageURL.includes('ipfs://')) {
          imageURL = imageURL.replace('ipfs://', 'https://ipfs.infura.io/ipfs/');
        }

        // console.log(`new imageurl ${imageURL}`);

        //ko
        let assetImage, assetImageThumbnail, assetImageName, assetImageDescription;
        assetImageThumbnail = imageURL;
        assetImage = imageURL;
        if (assetImage == null || assetImage == "") return null;
        tempIndex = tempIndex + 1;
        assetImageName = asset.metadata.name;
        assetImageDescription = asset.metadata.description;

        // opensea
        // let assetImage, assetImageThumbnail, assetImageName, assetImageDescription;
        // assetImageThumbnail = asset.image_thumbnail_url;
        // assetImage = asset.image_url;
        // if (assetImage == null || assetImage == "") return null;
        // tempIndex = tempIndex + 1;
        // assetImageName = asset.name;
        // assetImageDescription = asset.description;
        // }

        let pos1 = 0; let pos2 = 0; let pos3 = 0;

        let randNeg1 = Math.round(Math.random()) * 2 - 1;
        let randNeg2 = Math.round(Math.random()) * 2 - 1;
        let randNeg3 = Math.round(Math.random()) * 2 - 1;

        pos1 = randFloat(0, index) * randNeg1;
        pos2 = randFloat(0, index) * randNeg2;
        pos3 = randFloat(0, index) * randNeg3;

        //
        // if (tempIndex === 1) {
        //   pos1 = 0; pos2 = 1; pos3 = 4;
        // } else if (tempIndex === 2) {
        //   pos1 = 0; pos2 = 0.5; pos3 = 1;
        // } else if (tempIndex === 3) {
        //   pos1 = 0; pos2 = -2; pos3 = -2;
        // } else if (tempIndex === 4) {
        //   pos1 = -1.5; pos2 = -4; pos3 = -4;
        // } else if (tempIndex === 5) {
        //   pos1 = -1.5; pos2 = -4; pos3 = -5;
        // } else if (tempIndex === 6) {
        //   pos1 = -1.5; pos2 = -4; pos3 = -8;
        // } else if (tempIndex === 7) {
        //   pos1 = -4.5; pos2 = -7; pos3 = -10;
        // } else if (tempIndex === 8) {
        //   pos1 = -4.5; pos2 = -8; pos3 = -12;
        // } else if (tempIndex === 9) {
        //   pos1 = -4.5; pos2 = -8; pos3 = -14;
        // } else if (tempIndex === 10) {
        //   pos1 = -7.5; pos2 = -10; pos3 = -16;
        // } else if (tempIndex === 11) {
        //   pos1 = -7.5; pos2 = -10; pos3 = -18;
        // } else if (tempIndex === 12) {
        //   pos1 = -7.5; pos2 = -10; pos3 = -20;
        // } else if (tempIndex === 13) {
        //   pos1 = -10.5; pos2 = -12; pos3 = -22;
        // } else if (tempIndex === 14) {
        //   pos1 = -10.5; pos2 = -12; pos3 = -24;
        // } else if (tempIndex === 15) {
        //   pos1 = -10.5; pos2 = -13; pos3 = -26;
        // } else if (tempIndex === 16) {
        //   pos1 = -10.5; pos2 = -13; pos3 = -25;
        // }

        let newDate = new Date();
        newDate.setTime(asset.lastTransferTimestamp*1000);
        let dateString = newDate.toUTCString();

        return {
          order: tempIndex,
          imageUrl: assetImage,
          thumbnail: assetImageThumbnail,
          name: assetImageName,
          description: assetImageDescription,
          pos1: pos1,
          pos2: pos2,
          pos3: pos3,
          asset: asset,
          dateLost: dateString,
          lastPrice: asset.lastSalePriceInEth
        }
      }).filter((e:any) => e); // trim any nulls

      console.log('new array:');
      console.log(newAssets);

      // this section is for opensea which returns 20 at a time
      // let joinedAssets = newAssets.concat(assetsArray);
      //
      // console.log('here')
      // if (joinedAssets.length <= 10) {
      //   getAssets(joinedAssets, tempIndex, offset+20);
      // } else {
      //   console.log('final array');
      //   console.log(joinedAssets);
      //   setGallery(joinedAssets);
      // }
      setGallery(newAssets);
    }
  }

  const handleOpen = (image: any) => {
    setOpen(true);
    setSelectedImage(image);
  };

  const handleClose = () => {
    setOpen(false);
  };



  // const gallery = [
  //   { url: "https://upload.wikimedia.org/wikipedia/en/3/3c/PinkFloyd-album-piperatthegatesofdawn_300.jpg", pos1: 0, pos2: 1, pos3: 4, name: "Piper at the Gates of Dawn", description: "The Piper at the Gates of Dawn is the debut album by English rock band Pink Floyd, the only album made under founding member Syd Barrett's leadership."},
  //   { url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png", pos1: 0, pos2: 0.5, pos3: 1, name: "Dark Side of the Moon", description: "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records."},
  //   { url: "https://upload.wikimedia.org/wikipedia/en/7/74/Pink_Floyd-Animals-Frontal.jpg", pos1: 0, pos2: -2, pos3:-2, name: "Animals", description: "Animals is the tenth studio album by the English rock band Pink Floyd, released on 21 January 1977 through Harvest and Columbia Records."},
  //   { url: "https://upload.wikimedia.org/wikipedia/en/1/13/PinkFloydWallCoverOriginalNoText.jpg", pos1: -1.5, pos2: -4, pos3:-7, name: "The Wall", description: "The Wall is the eleventh studio album by the English rock band Pink Floyd, released on 30 November 1979 by Harvest and Columbia Records." }
  // ]


  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }


  const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );
  const classes2 = useStyles2();
  const [modalStyle] = React.useState(getModalStyle);



  return (
    <div>
      <div className="text1-container">
        <Typography variant="subtitle1" className="text1" gutterBottom>
          The Void
        </Typography>
      </div>

      <div className="text2-container">

        <Typography variant="subtitle2" className="text2" gutterBottom>
          <a target="_blank" href="https://unegma.com">unegma.com</a>
        </Typography>
      </div>

      <Modal
        className="timeline-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes2.paper}>
          <h2 id="simple-modal-title">{selectedImage.name}</h2>
          <p id="simple-modal-description" className="simple-modal-description">
            <b>Description:</b> {selectedImage.description}<br/>
          </p>
          <p><b>Last Price:</b> {selectedImage.lastPrice}<br/></p>
          <p><b>Date Lost:</b> {selectedImage.dateLost}<br/></p>
          <img src={selectedImage.imageUrl} /><br/>
          {/*<button onClick={initiateTransaction}>Buy NFT on Palm Network</button>*/}
        </div>
      </Modal>


      <Canvas className="timeline-canvas">
        {/*<PerspectiveCamera position={[4, 4, 7]} makeDefault />*/}
        <PerspectiveCamera position={[4, 7, 7]} makeDefault />
        <pointLight intensity={3} position={[5, 0, 5]} />

        {/* Lights */}
        {/*<rectAreaLight*/}
        {/*  intensity={3}*/}
        {/*  position={[5, 0, 5]}*/}
        {/*  rotation={[0, 0, 0]}*/}
        {/*  width={50}*/}
        {/*  height={50}*/}
        {/*/>*/}

        <color attach="background" args={['#000']} />

        {/*<Suspense fallback={null}>*/}
        {/*  <Grass />*/}
        {/*</Suspense>*/}

        <group>
          <group>
            {/*<Date date={1967} position={[-1,2,5]} rotation={[0,60,0]}></Date>*/}
            {/*<Date date={1977} position={[-2.5,-3,-5]} rotation={[0,0,0]}></Date>*/}
            {/*<Line color='white'position={[0, 0, 0]} geometry={[20, 0.1, 0.1]} rotation={[0, 0, 0]}/>*/}
            {/*<Line color='blue' position={[0, 0, 1]} geometry={[20, 0.1, 0.1]} rotation={[1, 7.9, 30]}/>*/}
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
          {/*<Moon />*/}
        </Suspense>

      </Canvas>
    </div>
  )
}
