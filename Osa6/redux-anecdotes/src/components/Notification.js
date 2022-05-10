import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.display
  }

  return (
    <div style={style}>
      You voted anecdote: {notification.message}
    </div>
  )
}

export default Notification