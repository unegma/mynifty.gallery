import React, {useEffect} from 'react';
import './homePage.module.scss';
import {Typography} from "@material-ui/core";
import {InfoOutlined, SettingsOutlined} from "@material-ui/icons";
import AudioPlayer from "../components/AudioPlayer";
import NFTModal from "../components/NFTModal";
import SettingsModal from "../components/SettingsModal";
import InfoModal from "../components/InfoModal";
import fetchAssets from '../helpers/fetchAssets';
import MainCanvas from "../components/MainCanvas";
import {Spinner} from "../components/Spinner";
import {DefaultXRControllers, useXR, VRCanvas} from '@react-three/xr'
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Web3ConnectionButtons from '../components/Web3ConnectionButtons';
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import DialogModal from "../components/DialogModal";


// todo more margins on modals
// todo less margin on info modal
// todo show settings modal first
// todo more obvious close modal button
// todo add enums
// todo move cookeis highur up

export default function HomePage(): JSX.Element {
  const context = useWeb3React<Web3Provider>(); // todo check because this web3provider is from ethers
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;
  const { player } = useXR();

  useEffect(() => {
    console.log(player)
  }, [])

  const [musicUrl, setMusicUrl] = React.useState("https://cdn.pixabay.com/download/audio/2021/07/18/audio_d920a53533.mp3?filename=ambient-piano-happy-days--5541.mp3");
  // const [musicUrl, setMusicUrl] = React.useState("https://www.free-stock-music.com/music/alexander-nakarada-space-ambience.mp3");
  const [address, setAddress] = React.useState<string>("");
  const [scene, setScene] = React.useState(1);
  const [source, setSource] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState('');
  const [vrMode, setVrMode] = React.useState(false);
  const [displayMode, setDisplayMode] = React.useState(0);
  const [maxImages, setMaxImages] = React.useState(15);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [zoomEnabled, setZoomEnabled] = React.useState(false);
  const [gallery, setGallery] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {

    let localStorageAddress = localStorage.getItem('address');
    if (typeof localStorageAddress !== "undefined" && localStorageAddress !== null && localStorageAddress !== "") {
      setAddress(localStorageAddress); // get first
    }

    let localStorageScene = localStorage.getItem('scene');
    if (typeof localStorageScene !== "undefined" && localStorageScene !== null && localStorageScene !== "") {
      setScene(parseInt(localStorageScene));
    }

    let localStorageSource = localStorage.getItem('source');
    if (typeof localStorageSource !== "undefined" && localStorageSource !== null && localStorageSource !== "") {
      setSource(parseInt(localStorageSource));
    }
    // if (account) {
    //   setAddress(account);
    // } else {
    //   setAddress(""); // todo maybe add an error message
    // }

    // open settings on first visit
    let localStorageFirstVisit = localStorage.getItem('firstVisit');
    if (typeof localStorageFirstVisit === "undefined" || localStorageFirstVisit === null || localStorageFirstVisit === "") {
      setInfoOpen(true);
      localStorage.setItem('firstVisit', 'false');
    }
    //
    // // todo the music url issue might not be working properly because of race conditions. May need an await in here (and move to music component)
    // let localStorageSource = localStorage.getItem('source');
    // if (typeof localStorageSource !== "undefined" && localStorageSource !== null && localStorageSource !== "") {
    //   setSource(localStorageSource);
    // }

    // todo the music url issue might not be working properly because of race conditions. May need an await in here (and move to music component)
    let localStorageMusicUrl = localStorage.getItem('musicUrl');
    if (typeof localStorageMusicUrl !== "undefined" && localStorageMusicUrl !== null && localStorageMusicUrl !== "") {
      setMusicUrl(localStorageMusicUrl);
    }

    let localStorageZoomEnabled = localStorage.getItem('zoomEnabled');
    if (typeof localStorageZoomEnabled !== "undefined" && localStorageZoomEnabled !== null && localStorageZoomEnabled !== "") {
      setZoomEnabled((localStorageZoomEnabled === 'true' ? true: false));
    }

    let localStorageVrMode = localStorage.getItem('vrMode');
    if (typeof localStorageVrMode !== "undefined" && localStorageVrMode !== null && localStorageVrMode !== "") {
      setVrMode((localStorageVrMode === 'true' ? true: false));
    }

    let localStorageDisplayMode = localStorage.getItem('displayMode');
    if (typeof localStorageDisplayMode !== "undefined" && localStorageDisplayMode !== null && localStorageDisplayMode !== "") {
      setDisplayMode(parseInt(localStorageDisplayMode));
    }
    let localStorageMaxImages = localStorage.getItem('maxImages');
    if (typeof localStorageMaxImages !== "undefined" && localStorageMaxImages !== null && localStorageMaxImages !== "") {
      setMaxImages(parseInt(localStorageMaxImages));
    }

    // this might be being called before the local storage retreival above
    getAssets();

  }, [source, address, maxImages]);


  async function getAssets () {
    let newAssets = await fetchAssets([], maxImages, address, source, 0);
    setLoading(false);
    if (newAssets.length === 0) {
      // todo fix this so that errors show but not when disconnecting
      // console.log('There has probably been an error (not very helpful I know sorry, but there ain\'t no Nifties!');
      // setErrorMessage('Looks like an error :(');
    }
    setGallery(newAssets);
  }

  const handleOpen = (image: any) => {
    setOpen(true);
    setSelectedImage(image);
  };

  const handleYouClickedMe = (name: string) => {
    setDialogOpen(true);
    setDialogData(name);
  }

  const toggleInfoModal = () => setInfoOpen(!infoOpen);
  const toggleSettingsModal = () => setSettingsOpen(!settingsOpen);

  return (
    <div>
      <div className="text1-container">
        <Typography variant="subtitle1" className="text1" >
          My NFTs:&nbsp;
          { loading &&
            <Spinner className="spinner" color="white"/>
          }
          { !loading && errorMessage === "" &&
            <a className="pointer underlined" onClick={() => {
              setSettingsOpen(true)
            }}>{maxImages} NFTs</a>
          }
          { errorMessage !== "" &&
            <span className="error">{errorMessage}</span>
            // todo reportme button
          }
        </Typography>
      </div>

      <div className="text2-container">

        <Typography variant="subtitle2" className="text2" >
          <a target="_blank" href="https://unegma.com">unegma.com</a>
        </Typography>
      </div>

      <div className="text3-container">
        <Typography variant="subtitle2" className="text3" >
          <Web3ConnectionButtons setAddress={setAddress} />
        </Typography>
      </div>

      <div className="text4-container">
        <Typography variant="subtitle2" className="text4" >
          <SettingsOutlined className="pointer" style={{ color: "white", marginLeft: "2px" }} onClick={toggleSettingsModal}/>
          <InfoOutlined className="pointer" style={{ color: "white", margin: "0 4px" }} onClick={toggleInfoModal}/>
          <AudioPlayer url={musicUrl} />
        </Typography>
      </div>

      <NFTModal open={open} setOpen={setOpen} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      <SettingsModal
        open={settingsOpen}
        setOpen={setSettingsOpen}
        zoomEnabled={zoomEnabled}
        setZoomEnabled={setZoomEnabled}
        vrMode={vrMode}
        setVrMode={setVrMode}
        setMusicUrl={setMusicUrl}
        musicUrl={musicUrl}
        setDisplayMode={setDisplayMode}
        displayMode={displayMode}
        maxImages={maxImages}
        setMaxImages={setMaxImages}
        setInfoOpen={setInfoOpen}
        scene={scene}
        setScene={setScene}
        source={source}
        setSource={setSource}
      />

      <InfoModal
        open={infoOpen}
        setOpen={setInfoOpen}
        maxImages={maxImages}
        openSettings={setSettingsOpen}
        address={address}
      />

      <DialogModal
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogData={dialogData}
        setDialogData={setDialogData}
      />

      { vrMode && (
        <VRCanvas className="timeline-canvas">
          <DefaultXRControllers />
          <OrbitControls enableZoom={zoomEnabled} />
          <MainCanvas
            vrMode={vrMode}
            gallery={gallery}
            handleOpen={handleOpen}
            displayMode={displayMode}
            scene={scene}
            source={source}
            handleYouClickedMe={handleYouClickedMe}
          />
        </VRCanvas>
      )}

      { !vrMode && (
        <Canvas className="timeline-canvas">
          <OrbitControls enableZoom={zoomEnabled} />
          <MainCanvas
            vrMode={vrMode}
            gallery={gallery}
            handleOpen={handleOpen}
            displayMode={displayMode}
            scene={scene}
            source={source}
            handleYouClickedMe={handleYouClickedMe}
          />
        </Canvas>
      )}

    </div>
  )
}

