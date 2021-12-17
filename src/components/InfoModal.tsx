import {Button, createStyles, makeStyles, Modal, Theme, Typography, Box} from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function InfoModal ({ open, setOpen, maxImages, openSettings, source, address }: any) {

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '90vw',
    minWidth: '85vw',
    maxHeight: '90vh',
    // minHeight: '85vh',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    // todo add close button on modal
    <Modal
      className="info-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box component="div" sx={modalStyle}>
        <HighlightOffIcon className="closeModalButton" onClick={() => { setOpen(false)}}/>

        <Typography variant="h3" className="secondaryColor">Info</Typography>
        <br/>

        <Typography className="secondaryColor">
          Visit the twin project of this site <a target="_blank" href="https://nifty.rip">nifty.rip</a> to see NFTs lost forever in the void.
        </Typography>

        <br/>

        {/* todo instructions for moving*/}


        {/*<Typography style={{color: '#333'}}>Burned (and therefore irrecoverable) NFTs sent to the address:<br/>*/}
        {/**/}
        {/*  <b>{address}<br/><br/></b>*/}
        <Typography className="secondaryColor">
          <b>Please allow time for loading. <br/>Change default # of assets in settings:</b><br/><br/>
          <Button variant="contained" color="primary" className="pointer underlined" onClick={()=>{setOpen(false); openSettings(true)}}>Change Settings</Button><br/><br/>
        </Typography>
        <hr/>
        <br/>
        <Typography className="secondaryColor">
          Contribute here: <a target="_blank" href="https://github.com/unegma/mynifty.gallery">Github</a>.<br/>
          Special thanks to: <a target="_blank" href="https://twitter.com/0xnibbler">@0xnibbler</a>, <a target="_blank" href="https://twitter.com/mo_ezz14">@mo_ezz14</a>, <a target="_blank" href="https://twitter.com/megami_network">@megami_network</a> and <a target="_blank" href="https://twitter.com/arielpopcorn">@arielpopcorn</a><br/><br/>
          <span style={{float: 'right'}}>Made by <a target="_blank" href="https://unegma.com">unegma</a>.</span>
        </Typography>
      </Box>
    </Modal>
  )
}
