import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Notification = ({ notification, invokeNotification }) => {
  const { msg, type } = notification
  const [open, setOpen] = React.useState(notification !== null)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    invokeNotification({ msg: null, type: null })
  }

  return msg && type ? (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type ? type : ""}>
        {msg ? msg : ""}
      </Alert>
    </Snackbar>
  ) : null
}

export default Notification
