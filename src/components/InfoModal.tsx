import {Button, createStyles, makeStyles, Modal, Theme, Typography} from "@material-ui/core";
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function InfoModal ({ open, setOpen, maxImages, openSettings, source, address }: any) {

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      maxWidth: '90vw',
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
        <HighlightOffIcon className="closeModalButton" onClick={() => { setOpen(false)}}/>

        <Typography variant="h3" style={{color: 'black'}}>Info</Typography>
        <br/>
        <Typography style={{color: '#333'}}>Burned (and therefore irrecoverable) NFTs sent to the address:<br/>

          <b>{address}<br/><br/></b>

          This site currently pulls data of the last <b>{maxImages}</b> burned NFTs on&nbsp;

          { source === 'knownorigin' && (
            <b><a target="_blank" href="https://knownorigin.io">Known Origin</a>.<br/><br/></b>
          )}
          { source === 'opensea' && (
            <b><a target="_blank" href="https://opensea.io">OpenSea</a>.<br/></b>
          )}

          Please allow a few minutes to load, especially if the number of assets to pull is high.<br/><br/>
          To change options visit: <b><Button variant="contained" color="primary" className="pointer underlined" onClick={()=>{setOpen(false); openSettings(true)}}>Settings</Button></b><br/><br/>
          Contribute here: <a target="_blank" href="https://github.com/timhc22/nifty.rip">Github</a>.<br/>
          Special thanks to: <a target="_blank" href="https://twitter.com/0xnibbler">@0xnibbler</a> and <a target="_blank" href="https://twitter.com/mo_ezz14">@mo_ezz14</a><br/>
          Made by <a target="_blank" href="https://unegma.com">unegma</a>.
        </Typography>
      </div>
    </Modal>
  )
}
