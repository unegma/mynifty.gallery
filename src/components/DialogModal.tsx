import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

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
