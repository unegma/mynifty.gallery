import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

export default function DialogModal ({ dialogOpen, setDialogOpen, dialogData, setDialogData }: any) {
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  // const Transition = React.forwardRef(function Transition(
  //   props: TransitionProps & { children?: React.ReactElement<any, any> },
  //   ref: React.Ref<unknown>,
  // ) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  //
  // return (
  //   <Dialog
  //     open={dialogOpen}
  //     TransitionComponent={Transition}
  //     keepMounted
  //     onClose={handleClose}
  //     aria-labelledby="alert-dialog-slide-title"
  //     aria-describedby="alert-dialog-slide-description"
  //   >
  //     <DialogTitle id="alert-dialog-slide-title">{"Dialog"}</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText id="alert-dialog-slide-description">
  //         You clicked {dialogData}!
  //       </DialogContentText>
  //     </DialogContent>
  //   </Dialog>
  // )
  return(
    <></>
  )
}
