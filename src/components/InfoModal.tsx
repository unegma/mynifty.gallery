import {createStyles, makeStyles, Modal, Theme, Typography} from "@material-ui/core";
import React from "react";

export default function InfoModal ({ open, setOpen, maxImages, openSettings }: any) {

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
    // todo add close button on modal
    <Modal
      className="timeline-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes2.paper}>
        <Typography variant="h3" style={{color: 'black'}}>Info</Typography>
        <br/>
        <Typography style={{color: '#333'}}>Burned and irrecoverable NFTs sent to the addresses:<br/><br/>
          * 0x0000000000000000000000000000000000000000<br/>
          * 0x000000000000000000000000000000000000dead<br/><br/>
          This site currently pulls data of the last (max) {maxImages} burned NFTs on&nbsp;
          <a target="_blank" href="https://knownorigin.io">Known Origin</a>.<br/><br/>
          Please currently allow a few minutes to load, especially if the number of assets to pull is really high.<br/><br/>
          Visit <a className="pointer underlined" onClick={()=>{setOpen(false); openSettings(true)}}>Settings</a> to change options.<br/><br/>
          <a target="_blank" href="https://github.com/timhc22/nifty.rip">Github</a>.<br/><br/>
          Special thanks to: <a target="_blank" href="https://twitter.com/0xnibbler">@0xnibbler</a> and <a target="_blank" href="https://twitter.com/mo_ezz14">@mo_ezz14</a><br/><br/>
          Made by <a target="_blank" href="https://unegma.com">unegma</a>.
        </Typography>
      </div>
    </Modal>
  )
}
