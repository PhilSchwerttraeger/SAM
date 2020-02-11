import { connect } from "react-redux"
import Notification from "./notification.component"
import { createStructuredSelector } from "reselect"
import { selectNotification } from "../../redux/user/user.selectors"
import { invokeNotification } from "../../redux/user/user.actions"

const mapStateToProps = createStructuredSelector({
  notification: selectNotification,
})

const mapDispatchToProps = dispatch => ({
  invokeNotification: notification =>
    dispatch(invokeNotification(notification)),
})

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification)

export default NotificationContainer
