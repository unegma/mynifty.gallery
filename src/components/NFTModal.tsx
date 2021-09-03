import {createStyles, makeStyles, Modal, Theme} from "@material-ui/core";
import React from "react";

export default function NFTModal ({ open, selectedImage, setOpen, setSelectedImage }: any) {

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      maxWidth: '90vw',
      maxHeight: '70vh'
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
        <h2 id="simple-modal-title">{selectedImage.name}</h2>
        <p><b>Date Lost:</b> {selectedImage.dateLost}<br/></p>
        <p id="simple-modal-description" className="simple-modal-description">
          <b>Description:</b> {selectedImage.description}<br/>
        </p>
        <p><b>Last Price:</b> {selectedImage.lastPrice} ETH<br/></p>
        <br/>
        <img src={selectedImage.imageUrl} /><br/>
        {/*<button onClick={initiateTransaction}>Buy NFT on Palm Network</button>*/}
      </div>
    </Modal>
  )
}
