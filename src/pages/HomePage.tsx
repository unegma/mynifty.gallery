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
import {Source} from '../types/SourceEnum';
import {Scene} from '../types/SceneEnum';
import {DisplayMode} from '../types/DisplayModeEnum';

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
    console.log('player here1');
    console.log(player);
  }) // todo if there is no [], then it only fires 1 time on page load

  useEffect(() => {
    console.log('player here2');
    console.log(player);
  }, []) // todo if there is no [], then it only fires 1 time on page load

  useEffect(() => {
    console.log('player here3');
    console.log(player);
  }, [player]) // todo if there is no [], then it only fires 1 time on page load


  const [musicUrl, setMusicUrl] = React.useState("https://cdn.pixabay.com/download/audio/2021/07/18/audio_d920a53533.mp3?filename=ambient-piano-happy-days--5541.mp3");
  // const [musicUrl, setMusicUrl] = React.useState("https://www.free-stock-music.com/music/alexander-nakarada-space-ambience.mp3");
  const [address, setAddress] = React.useState<string>("");
  const [scene, setScene] = React.useState<Scene|string>(Scene.Space);
  const [source, setSource] = React.useState<Source|string>(Source.POAP);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState('');
  const [vrMode, setVrMode] = React.useState(false);
  const [displayMode, setDisplayMode] = React.useState<DisplayMode|string>(DisplayMode.Cluster);
  const [maxImages, setMaxImages] = React.useState(30);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [zoomEnabled, setZoomEnabled] = React.useState(false);
  const [gallery, setGallery] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [myLabel, setMyLabel] = React.useState(""); // used for share link
  const [sharedGalleryView, setSharedGalleryView] = React.useState(false); // used for share link

  useEffect(() => {

    let _sharedGalleryView = false;
    let queryString = new URLSearchParams(window.location.search);
    let p = queryString.get('p');

    if (typeof p !== 'undefined' && p !== null) {
      console.log(`p is ${p}`)
    
      console.log('im here')
      console.log('p'); // TODO CHECK IF THIS IS BEING CALLED AT THE WRONG TIME

      setSharedGalleryView(true);
      _sharedGalleryView = true;
      let params = atob(p);
      // params = btoa(`account=${account}&displayMode=${displayMode}&source=${source}&scene=${scene}`);
      console.log(params);

      // todo  create type of url params ?
      // todo create struct of cookies // todo replace with 'cookieOverride'
      let fakeCookies: any = Object.fromEntries(new URLSearchParams(params));
      console.log(fakeCookies);
      setAddress(fakeCookies.account);
      setDisplayMode(fakeCookies.displayMode);
      setSource(fakeCookies.source);
      setScene(fakeCookies.scene);
      setMusicUrl(fakeCookies.musicUrl);
      setZoomEnabled(fakeCookies.zoomEnabled);
      setVrMode(fakeCookies.vrMode);
      setMyLabel(fakeCookies.myLabel);
      //set // TODO CHECK NOTHING WAS WIPED HERE
      //  todo create serialised version of object so that can pass data about whether certain items are sellable or not (user SHOULD BE ABLE TO SELECT SELLABLE AND WHICH SOURCE)
    }

  // todo move all this to a cookies helper hook or something (cookies also set in Web3ConnectionButtons, but the connect button is removed so it shouldnt be an issue here)
  if (_sharedGalleryView === false) { // ie every scenario which isn't sharing gallery link

// when using the State variable, on change, is this useEffect called again?
// alert('test') // TODO WHY IS THIS CALLED 2 TIMES?? // bug which was having was that needed to pass sharedGalleryView in as a dependency to the array below
    let localStorageAddress = localStorage.getItem('address');
    if (typeof localStorageAddress !== "undefined" && localStorageAddress !== null && localStorageAddress !== "") {
      setAddress(localStorageAddress); // get first
    } // TODO DOES THIS CAUSE THE useEffect TO BE CALLED AGAIN?
    // DON'T GET ADDRESS FROM COOKIES MAYBE, BECAUSE CAN CREATE A SHARE LINK WITH NO ADDRESS IN IT??

    let localStorageScene = localStorage.getItem('scene');
    if (typeof localStorageScene !== "undefined" && localStorageScene !== null && localStorageScene !== "") {

      // todo removeme (patch)

      // @ts-ignore
      if(!isNaN(localStorageScene)) {
        localStorage.setItem('scene', "");
        console.log('reloading to patch new cookies');
        window.location.reload();
      }
      // todo removeme (patch)

      setScene(localStorageScene);
    }

    let localStorageSource = localStorage.getItem('source');
    if (typeof localStorageSource !== "undefined" && localStorageSource !== null && localStorageSource !== "") {

      // todo removeme (patch) THIS ONE DOESN'T SEEM TO WORK PROPERLY
      // @ts-ignore
      if(!isNaN(localStorageSource)) {
        localStorage.setItem('source', "");
        console.log('reloading to patch new cookies');
        window.location.reload();
      }
      // todo removeme (patch)

      setSource(localStorageSource);
    }
    // if (account) {
    //   setAddress(account);
    // } else {
    //   setAddress(""); // todo maybe add an error message
    // }

    // open settings on first visit
    let localStorageFirstVisit = localStorage.getItem('firstVisit');
    if (typeof localStorageFirstVisit === "undefined" || localStorageFirstVisit === null || localStorageFirstVisit === "") {
      setSettingsOpen(true);
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
  console.log('display mode')
  console.log(localStorageDisplayMode)
    if (typeof localStorageDisplayMode !== "undefined" && localStorageDisplayMode !== null && localStorageDisplayMode !== "") {
      console.log(localStorageDisplayMode)
      // todo removeme (patch)
      // @ts-ignore
      if(!isNaN(localStorageDisplayMode)) {
        localStorage.setItem('displayMode', "");
        console.log('reloading to patch new cookies');
        window.location.reload();
      }
      // todo removeme (patch)

      setDisplayMode(localStorageDisplayMode);
    }
    let localStorageMaxImages = localStorage.getItem('maxImages');
    if (typeof localStorageMaxImages !== "undefined" && localStorageMaxImages !== null && localStorageMaxImages !== "") {
      setMaxImages(parseInt(localStorageMaxImages));
    }

  } else {
    console.log('setting sharedaddress');
    localStorage.setItem('sharedaddress', address); // todo this is temporary so can override in fetch assets (without overwriting my gallery addres in localstorage). eventuall get all links from url params
    // DON'T GET ADDRESS FROM COOKIES MAYBE, BECAUSE CAN CREATE A SHARE LINK WITH NO ADDRESS IN IT??
    console.log(address); // todo is this going to have been set by this point or only locally within the useEffect? // todo and does setting it here cause the function to be called again??
  }

    // this might be being called before the local storage retreival above
    getAssets();

  }, [source, address, maxImages]); // do these here cause useEffect to be called again when they change? (don't add sharedGalleryView in here in that case)


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
          { !sharedGalleryView && (
            <>
              My NFTs:&nbsp;
            </>
          )}
          { myLabel && (
            <>
              {myLabel}:&nbsp;
            </>
          )}
          { loading &&
            <Spinner className="spinner" color="white"/>
          }
          { !loading && errorMessage === "" &&
            <a className="pointer underlined" onClick={() => {
            if(!sharedGalleryView) {
              setSettingsOpen(true)
            }
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
        { !sharedGalleryView && (
          <Typography variant="subtitle2" className="text3" >
            <Web3ConnectionButtons setAddress={setAddress} setSettingsOpen={setSettingsOpen}/>
          </Typography>
        )}
      </div>

      <div className="text4-container">
        <Typography variant="subtitle2" className="text4" >
          { !sharedGalleryView && (
            <>
              <SettingsOutlined className="pointer" style={{ color: "white", marginLeft: "2px" }} onClick={toggleSettingsModal}/>
              <InfoOutlined className="pointer" style={{ color: "white", margin: "0 4px" }} onClick={toggleInfoModal}/>
            </>
          )}
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

