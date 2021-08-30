import {
  Button,
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Theme, Typography
} from "@material-ui/core";
import React from "react";
import {Switch} from "@material-ui/core";

export default function SettingsModal ({ open, setOpen, zoomEnabled, setZoomEnabled, setMusicUrl, musicUrl,
                                         setDisplayMode, displayMode, maxImages, setMaxImages }: any) {

  const toggleZoomEnabled = () => {
    let zoomEnabledOption = !zoomEnabled;
    setZoomEnabled(zoomEnabledOption);
    localStorage.setItem('zoomEnabled', zoomEnabledOption.toString());
  }

  const updateMusicUrl = (url: string) => {
    setMusicUrl(url);
    localStorage.setItem('musicUrl', url);
    // localStorage.setItem('musicUrl', JSON.stringify(url));
  }

  const updateDisplayMode = (dm: any) => {
    setDisplayMode(dm);
    localStorage.setItem('displayMode', dm);
    // localStorage.setItem('musicUrl', JSON.stringify(url));
  }

  const updateMaxImages = (mi: any) => {
    setMaxImages(mi);
    localStorage.setItem('maxImages', mi);
  }

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      minWidth: '50vw',
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // todo add close button on modal
    <Modal
      className="timeline-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes2.paper}>
        <Typography variant="h3" style={{color: 'black'}}>Settings</Typography>
        <br/>
        <Typography style={{color: 'black'}}>Zoom Enabled:</Typography>
        {/*<Button variant="contained" color="primary" onClick={toggleZoomEnabled}>Toggle Zoom</Button>*/}
        <Switch checked={zoomEnabled} onChange={toggleZoomEnabled} color="primary" />
        <br/>
        <br/>
        <TextField
          className="audioURLInput"
          type="url"
          value={musicUrl}
          onChange={(e) => updateMusicUrl(e.target.value)}
          label="AudioURL"
        />
        <br/>
        <br/>

        <InputLabel id="demo-simple-select-label">Display Mode:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={displayMode}
          onChange={(ev) => {updateDisplayMode(ev.target.value)}}
        >
          <MenuItem value={0}>Cluster</MenuItem>
          <MenuItem value={1}>Spiral</MenuItem>
        </Select>

        <br/>
        <br/>
        {/*max images setting*/}
        <TextField
          type="number"
          value={maxImages}
          onChange={(e) => updateMaxImages(e.target.value)}
          label="Max Images"
          InputProps={{
            inputProps: {
              min: 1 , max: 100
            }
          }}
        />
        <br/><br/>

        <Button variant="contained" color="primary" onClick={()=>{window.location.reload();}}>Refresh Page</Button>
      </div>
    </Modal>
  )
}
