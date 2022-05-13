import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../reducers/toggableReducer'

const Togglable = (props) => {
  const visible = useSelector(state => state.togglable)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(toggle())
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

export default Togglable