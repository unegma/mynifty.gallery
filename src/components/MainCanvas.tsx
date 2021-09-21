import React, {Suspense, useEffect, useState} from "react";
import { Source } from '../types/SourceEnum';
import SpaceScene from "./Scenes/SpaceScene";
import EarthScene from "./Scenes/EarthScene";
import CoworkScene from "./Scenes/CoworkScene";
import NFTGallery from "./NFTGallery";

export default function MainCanvas({gallery, handleOpen, displayMode, scene, source, handleYouClickedMe, vrMode}: any) {

  const [shape, setShape] = useState('square');

  useEffect(() => {
    // todo change these to use enum/type or interface or whichever is the most recent correct typescript way
    if (source === Source.Wallet) {
      setShape('square');
    } else if (source === Source.POAP) {
      setShape('disk');
    }
  }, [source, shape, setShape]); // todo check these

  return (
    <>

      {/*todo use enum*/}
      { scene === 1 && (
        <SpaceScene handleYouClickedMe={handleYouClickedMe} />
      )}

      {/*todo use enum*/}
      { scene === 2 && (
        <EarthScene handleYouClickedMe={handleYouClickedMe} />
      )}

      { scene === 3 && (
        <CoworkScene />
      )}

      <NFTGallery gallery={gallery} vrMode={vrMode} displayMode={displayMode} handleOpen={handleOpen} shape={shape} />

    </>
  )
}
