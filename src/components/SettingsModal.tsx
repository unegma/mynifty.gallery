import {Button, createStyles, makeStyles, Modal, TextField, Theme} from "@material-ui/core";
import React from "react";

export default function SettingsModal ({ open, setOpen, zoomEnabled, setZoomEnabled, setMusicUrl, musicUrl }: any) {

  const toggleZoomEnabled = () => {
    setZoomEnabled(!zoomEnabled);
  }

  const updateMusicUrl = (url: string) => {
    setMusicUrl(url);
    localStorage.setItem('musicUrl', url);
    // localStorage.setItem('musicUrl', JSON.stringify(url));
  }

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      className="timeline-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes2.paper}>
        <h2 id="simple-modal-title">Settings</h2>
        <p>{ zoomEnabled ? 'Zoom Enabled' : 'Zoom Disabled' }</p>
        <Button variant="contained" color="primary" onClick={toggleZoomEnabled}>Toggle Zoom</Button>
        <br/>
        <TextField
          type="url"
          value={musicUrl}
          onChange={(e) => updateMusicUrl(e.target.value)}
          label="AudioURL"
        />
      </div>
    </Modal>
  )
}
