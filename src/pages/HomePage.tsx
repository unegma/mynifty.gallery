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

export default function HomePage(): JSX.Element {
  // const [musicUrl, setMusicUrl] = React.useState("https://www.free-stock-music.com/music/alexander-nakarada-space-ambience.mp3");
  const [musicUrl, setMusicUrl] = React.useState("https://cdn.pixabay.com/download/audio/2021/08/09/audio_046edb7268.mp3?filename=dunes-7115.mp3");
  const [open, setOpen] = React.useState(false);
  const [displayMode, setDisplayMode] = React.useState(0);
  const [maxImages, setMaxImages] = React.useState(15);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [zoomEnabled, setZoomEnabled] = React.useState(false);
  const [gallery, setGallery] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // todo the music url issue might not be working properly because of race conditions. May need an await in here (and move to music component)
    let localStorageMusicUrl = localStorage.getItem('musicUrl');
    if (typeof localStorageMusicUrl !== "undefined" && localStorageMusicUrl !== null && localStorageMusicUrl !== "") {
      setMusicUrl(localStorageMusicUrl);
    }

    let localStorageZoomEnabled = localStorage.getItem('zoomEnabled');
    if (typeof localStorageZoomEnabled !== "undefined" && localStorageZoomEnabled !== null && localStorageZoomEnabled !== "") {
      setZoomEnabled((localStorageZoomEnabled === 'true' ? true: false));
    }

    let localStorageDisplayMode = localStorage.getItem('displayMode');
    if (typeof localStorageDisplayMode !== "undefined" && localStorageDisplayMode !== null && localStorageDisplayMode !== "") {
      setDisplayMode(parseInt(localStorageDisplayMode));
    }
    let localStorageMaxImages = localStorage.getItem('maxImages');
    if (typeof localStorageMaxImages !== "undefined" && localStorageMaxImages !== null && localStorageMaxImages !== "") {
      setMaxImages(parseInt(localStorageMaxImages));
    }

    getLoading();

    // this might be being called before the local storage retreival above
    getAssets();
  }, []);

  /**
   * this is here as a test, maybe move all localstorage loadings to an async function?
   */
  async function getLoading() {
    console.log(`Loading for: ${maxImages}`);
    // currently we show the loading spinner giving 1 second per image
    setTimeout(() => {
      setTimeout(() => {
        setLoading(false);
      }, maxImages * 1000);
    }, 3000); // todo temporary fix: wait 1 second because localStorage value isn't retreived immediately
  }

  async function getAssets () {
    let newAssets = await fetchAssets([], maxImages);
    setGallery(newAssets);
  }

  const handleOpen = (image: any) => {
    setOpen(true);
    setSelectedImage(image);
  };

  const toggleInfoModal = () => setInfoOpen(!infoOpen);
  const toggleSettingsModal = () => setSettingsOpen(!settingsOpen);

  return (
    <div>
      <div className="text1-container">
        <Typography variant="subtitle1" className="text1" >
          The Void:&nbsp;
          {loading ?
            <Spinner className="spinner" color="white"/> :
            <a className="pointer underlined" onClick={() => {
              setSettingsOpen(true)
            }}>last {maxImages}</a>
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
          <InfoOutlined className="pointer" style={{ color: "white" }} onClick={toggleInfoModal}/>
          <SettingsOutlined className="pointer" style={{ color: "white", marginLeft: "2px" }} onClick={toggleSettingsModal}/>
        </Typography>
      </div>

      <div className="text4-container">
        <Typography variant="subtitle2" className="text3" >
          <AudioPlayer url={musicUrl} />
        </Typography>
      </div>

      <NFTModal open={open} setOpen={setOpen} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <SettingsModal
        open={settingsOpen}
        setOpen={setSettingsOpen}
        zoomEnabled={zoomEnabled}
        setZoomEnabled={setZoomEnabled}
        setMusicUrl={setMusicUrl}
        musicUrl={musicUrl}
        setDisplayMode={setDisplayMode}
        displayMode={displayMode}
        maxImages={maxImages}
        setMaxImages={setMaxImages}
      />
      <InfoModal open={infoOpen} setOpen={setInfoOpen} maxImages={maxImages} openSettings={setSettingsOpen}/>

      <MainCanvas gallery={gallery} zoomEnabled={zoomEnabled} handleOpen={handleOpen} displayMode={displayMode} />
    </div>
  )
}
