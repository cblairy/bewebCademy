import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props: any) {
  //* Copy to Parent and pass it as props  */
  //    const [open, setOpen] = React.useState(false);


  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };

  return (
    <Snackbar open={props.open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" >
        {props.message}
      </Alert>
    </Snackbar>
  );
}