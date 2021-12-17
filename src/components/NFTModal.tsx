import './nftModal.scss';
import {createStyles, makeStyles, Modal, Theme, Box} from "@mui/material";
import React from "react";
import {HighlightOff as HighlightOffIcon } from "@mui/icons-material";

export default function NFTModal ({ open, selectedImage, setOpen, setSelectedImage }: any) {

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '90vw',
    minWidth: '85vw',
    maxHeight: '90vh',
    minHeight: '85vh',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setSelectedImage({}); // clear so image from previous piece isn't shown when opening next (if image is large and takes time to load)
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
      <Box component="div" sx={modalStyle}>
        <HighlightOffIcon className="closeModalButton" onClick={() => { setOpen(false)}}/>

        <h2 className="secondaryColor" id="simple-modal-title">{selectedImage.name}</h2>

        { selectedImage.dateLost && (
          <p className="secondaryColor"><b>Date Lost:</b> {selectedImage.dateLost}<br/></p>
        )}

        <p id="simple-modal-description" className="secondaryColor">
          <b>Description:</b> {selectedImage.description}<br/>
        </p>

        { selectedImage.lastPrice && (
          <p className="secondaryColor"><b>Last Price:</b> {selectedImage.lastPrice} ETH<br/></p>
        )}
        <br/>

        <img className="nftImage" src={selectedImage.imageUrl} /><br/>
        {/*<button onClick={initiateTransaction}>Buy NFT on Palm Network</button>*/}
      </Box>
    </Modal>
  )
}
