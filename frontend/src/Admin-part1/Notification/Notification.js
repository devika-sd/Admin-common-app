import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as useractions from '../../Actions/user-action'
import * as orderactions from '../../Actions/order-action'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [variant,setVariant]= React.useState(props.variant);
  const [msg,setMsg]= React.useState("");
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    var mes=props.message1||props.message2
    console.log("mes",mes);
    console.log("selected message is ",props.message1||props.message2)
    setMsg(mes)
    setOpen(true)
    setTimeout(()=>{
      props.userResetmessage("");
      props.orderResetmessage("");
      setMsg("");
    },2000)
}, [props.message1,props.message2])

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={variant}>
            {msg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("from notification",state.orderReducer.message)
  return {
      message1: state.userReducer.message,
      message2: state.orderReducer.message
  }        

}
const mapDispatchToProps = (dispatch) => {
  return {
    userResetmessage: (reset)=>  dispatch({type: useractions.RESET_MESSAGE,payload:reset}),
    orderResetmessage: (reset)=>  dispatch({type: orderactions.RESET_MESSAGE,payload:reset})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomizedSnackbars);
