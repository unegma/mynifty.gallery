import './settings.scss';
import {
  Button,
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Theme, Typography,
  Accordion, AccordionSummary, AccordionDetails,
} from "@mui/material";
import React, {useEffect} from "react";
import {Switch} from "@mui/material";
import {HighlightOff as HighlightOffIcon} from '@mui/icons-material';
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import metaMaskLogo from '../images/metamask-logo.svg';
import poapLogo from '../images/poap-logo.svg';
import spaceImage from '../images/space.png';
import earthImage from '../images/earth.png';
import galleryImage from '../images/gallery.png';
import plinthImage from '../images/plinth.png';
import coworkImage from '../images/cowork.png';
import clusterImage from '../images/cluster.png';
import galaxyImage from '../images/galaxy.png';
import swirlImage from '../images/swirl.png';
import spiralImage from '../images/spiral.png';
import { Source } from '../types/SourceEnum';
import { Scene } from '../types/SceneEnum';
import { DisplayMode } from '../types/DisplayModeEnum';
import {ExpandMore} from "@mui/icons-material";

export default function SettingsModal ({ open, setOpen, zoomEnabled, setZoomEnabled, setMusicUrl, musicUrl,
                                         setDisplayMode, displayMode, maxImages, setMaxImages, vrMode, setVrMode,
                                         setInfoOpen, scene, setScene, source, setSource }: any) {

  const context = useWeb3React<Web3Provider>(); // todo check because this web3provider is from ethers
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;
  const [expanded, setExpanded] = React.useState(false);
  const [shareLink, setShareLink] = React.useState("");

  const [myLabel, setMyLabel] = React.useState(``);

  useEffect(() => {
    let localStorageMyLabel = localStorage.getItem('myLabel');
    if (typeof localStorageMyLabel !== "undefined" && localStorageMyLabel !== null && localStorageMyLabel !== "") {
      setMyLabel(localStorageMyLabel);
    }
  }, []);

  const updateMyLabel = (val: any) => {
    setMyLabel(val);
    localStorage.setItem('myLabel', val);
  }

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  const generateShareLink = () => {

    let params: any;
    // TODO ADD THIS TO THE COOKIES HELPER HOOK?
    params = btoa(`account=${account}&displayMode=${displayMode}&maxImages=${maxImages}&source=${source}&scene=${scene}&zoomEnabled=${zoomEnabled}&musicUrl=${musicUrl}&vrMode=${vrMode}&myLabel=${myLabel}`);

    // todo add array of all nfts so can add custom data

    let location = window.location.origin + window.location.pathname; // remove any querystring

    // todo could there be an issue with xss etc if encoding into url like this. may be better to do via own server

    setShareLink(`${location}?p=${params}`)
  }

  const toggleZoomEnabled = () => {
    let zoomEnabledOption = !zoomEnabled;
    setZoomEnabled(zoomEnabledOption);
    localStorage.setItem('zoomEnabled', zoomEnabledOption.toString());
  }

  const toggleVrMode = () => {
    let vrModeOption = !vrMode;
    setVrMode(vrModeOption);
    localStorage.setItem('vrMode', vrModeOption.toString());
  }

  const updateMusicUrl = (url: string) => {
    setMusicUrl(url);
    localStorage.setItem('musicUrl', url);
    // localStorage.setItem('musicUrl', JSON.stringify(url));
  }

  const updateDisplayMode = (dm: any) => {
    setDisplayMode(dm);
    localStorage.setItem('displayMode', dm);
  }

  const updateMaxImages = (mi: any) => {
    setMaxImages(mi);
    localStorage.setItem('maxImages', mi);
  }

  const updateScene = (sc: any) => {
    setScene(sc);
    localStorage.setItem('scene', sc);
  }

  const updateSource = (src: any) => {
    setSource(src);
    localStorage.setItem('source', src);
  }

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      minWidth: '80vw',
      maxWidth: '90vw',
      maxHeight: '70vh',
      overflow: 'scroll'
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
        paddingTop: 0,
      },
    }),
  );

  const classes2 = useStyles2();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // todo add close button on modal
    <Modal
      className="settings-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes2.paper}>
        <div className="fixedSettingsTag">
          {/*<HighlightOffIcon className="closeModalButton" onClick={() => { setOpen(false)}}/>*/}
          <Button variant="contained" color="primary" className={`closeModalButton closeModalButtonOk`} onClick={() => { setOpen(false)}}>
            Ok
          </Button>

          <Typography variant="h3" className="secondaryColor">Settings</Typography>
          <br/>
        </div>

        {/*<Typography className="secondaryColor">More <a className="pointer underlined" onClick={()=>{setOpen(false); setInfoOpen(true)}}>Info here</a>.</Typography>*/}
        {/*<br/>*/}
        {/*<hr/>*/}
        <br/>
        <InputLabel className="connectedAddressLabel">Connected Address: <br/>{account ? <span className="minitext, secondaryColor">{account}</span> : <span className="secondaryColor">Click Connect in the top right</span> }</InputLabel>


        {/*<Select*/}
        {/*  className="addressInput"*/}
        {/*  labelId="demo-simple-select-label3"*/}
        {/*  id="demo-simple-select3"*/}
        {/*  value={address}*/}
        {/*  onChange={(ev) => {updateAddress(ev.target.value)}}*/}
        {/*>*/}
        {/*  <MenuItem value={"0x0000000000000000000000000000000000000000"}>0x0000000000000000000000000000000000000000</MenuItem>*/}
        {/*  <MenuItem value={"0x000000000000000000000000000000000000dead"}>0x000000000000000000000000000000000000dead</MenuItem>*/}
        {/*  /!*<MenuItem value={"0x8309d9a1B39CC5f309B5e44db315532Afb60f43e"}>0x8309d9a1B39CC5f309B5e44db315532Afb60f43e</MenuItem>*!/*/}
        {/*</Select>*/}
        <br/>
        <div className="shareLinkBox">
          <TextField
            id="outlined-basic"
            className="shareLinkLabel"
            label="Your Gallery Name"
            variant="outlined"
            value={myLabel}
            onChange={(e) => {updateMyLabel(e.target.value)}}
          />
          <Button
            variant="outlined"
            color="primary"
            className="shareLinkButton"
            onClick={() => {generateShareLink()}}
          >
            Create Share Link
          </Button>
        </div>
        <br/>
        <Typography className="generatedShareLink" onClick={() => {navigator.clipboard.writeText(shareLink)}}>{shareLink ? <><span className="secondaryColor">Your Shareable Link:</span><br/>{shareLink}</> : ""}</Typography>
        <br/>
        <hr/>
        <br/>
        <Typography variant="h5" className="secondaryColor">Basic</Typography>
        <br/>

        <div className="sourceLogo-container">
          <div className="sourceLogo-container2">
            <Typography className="secondaryColor" id="demo-simple-select-label2">Source: </Typography>
          {/*  <Select*/}
          {/*    labelId="demo-simple-select-label2"*/}
          {/*    id="demo-simple-select2"*/}
          {/*    value={source}*/}
          {/*    onChange={(ev) => {updateSource(ev.target.value)}}*/}
          {/*  >*/}
          {/*    <MenuItem value={1}>My Wallet</MenuItem>*/}
          {/*    <MenuItem value={2}>POAP</MenuItem>*/}
          {/*  </Select>*/}
          </div>
          <div className="sourcesBox">
            <img className={`sourceLogo ${source === Source.Wallet ? "sourceLogo--active" : "" }`} src={metaMaskLogo} onClick={() => updateSource(Source.Wallet)}/>
            <img className={`sourceLogo ${source === Source.POAP ? "sourceLogo--active" : "" }`} src={poapLogo} onClick={() => updateSource(Source.POAP)}/>
          </div>
        </div>

        <br/>

        <InputLabel id="demo-simple-select-label">Scene:</InputLabel>

        <div className="scenesBox">
          <img className={`sceneLogo ${scene === Scene.Space ? "sceneLogo--active" : "" }`} src={spaceImage} onClick={() => updateScene(Scene.Space)}/>
          <img className={`sceneLogo ${scene === Scene.Earth ? "sceneLogo--active" : "" }`} src={earthImage} onClick={() => updateScene(Scene.Earth)}/>
          <img className={`sceneLogo ${scene === Scene.Cowork ? "sceneLogo--active" : "" }`} src={coworkImage} onClick={() => updateScene(Scene.Cowork)}/>
          <img className={`sceneLogo ${scene === Scene.Gallery ? "sceneLogo--active" : "" }`} src={galleryImage} onClick={() => updateScene(Scene.Gallery)}/>
          <img className={`sceneLogo ${scene === Scene.Plinth ? "sceneLogo--active" : "" }`} src={plinthImage} onClick={() => updateScene(Scene.Plinth)}/>
        </div>

        <br/>
        <br/>

        {/*todo use enum*/}
        { scene !== Scene.Gallery && scene !== Scene.Plinth && (
          <>
            <InputLabel id="demo-simple-select-label">Display Mode:</InputLabel>

            <div className="displayModeBox">
              <img className={`displayModeLogo ${displayMode === DisplayMode.Cluster ? "displayModeLogo--active" : "" }`} src={clusterImage} onClick={() => updateDisplayMode(DisplayMode.Cluster)}/>
              <img className={`displayModeLogo ${displayMode === DisplayMode.Spiral ? "displayModeLogo--active" : "" }`} src={spiralImage} onClick={() => updateDisplayMode(DisplayMode.Spiral)}/>
              <img className={`displayModeLogo ${displayMode === DisplayMode.Galaxy ? "displayModeLogo--active" : "" }`} src={galaxyImage} onClick={() => updateDisplayMode(DisplayMode.Galaxy)}/>
              <img className={`displayModeLogo ${displayMode === DisplayMode.Swirl ? "displayModeLogo--active" : "" }`} src={swirlImage} onClick={() => updateDisplayMode(DisplayMode.Swirl)}/>
            </div>
            <br/>
            <br/>
          </>
        )}


        {/*max images setting*/}
        <TextField
          type="number"
          value={maxImages}
          onChange={(e) => updateMaxImages(e.target.value)}
          label="Max Images <="
          InputProps={{
            inputProps: {
              min: 1 , max: 100
            }
          }}
        />
        <br/><br/>

        {/*<hr/>*/}

        {/*<br/>*/}

        {/*<Typography variant="h5" className="secondaryColor">Advanced</Typography>*/}
        {/*<br/>*/}

        <Accordion onChange={handleChange('panel1')} className="settings-according">
          <AccordionSummary
            className="settings-according--summary"
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>
              Advanced Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Typography variant="h5" className="secondaryColor">Zoom Enabled:</Typography>
            {/*<Button variant="contained" color="primary" onClick={toggleZoomEnabled}>Toggle Zoom</Button>*/}
            <Switch checked={zoomEnabled} onChange={toggleZoomEnabled} color="primary" />
            <br/>
            <br/>
            <Typography className="secondaryColor">VR Mode:</Typography>
            {/*<Button variant="contained" color="primary" onClick={toggleZoomEnabled}>Toggle Zoom</Button>*/}
            <Switch checked={vrMode} onChange={toggleVrMode} color="primary" />
            <br/>
            <br/>
            <TextField
              className="audioURLInput"
              type="url"
              value={musicUrl}
              onChange={(e) => updateMusicUrl(e.target.value)}
              label="AudioURL"
            />
          </AccordionDetails>
        </Accordion>
        {/*<Button variant="contained" color="primary" onClick={()=>{window.location.reload();}}>Refresh Page</Button>*/}
      </div>
    </Modal>
  )
}
