import './nftModal.scss';
import {createStyles, makeStyles, Modal, Theme} from "@material-ui/core";
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function NFTModal ({ open, selectedImage, setOpen, setSelectedImage }: any) {

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      minWidth: '85vw',
      maxWidth: '90vw',
      minHeight: '85vh',
      maxHeight: '90vh',
      overflow: 'scroll',
      display: 'flex',
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
        flexDirection: 'column'
      },
    }),
  );

  const classes2 = useStyles2();
  const [modalStyle] = React.useState(getModalStyle);

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
      <div style={modalStyle} className={classes2.paper}>
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
      </div>
    </Modal>
  )
}
