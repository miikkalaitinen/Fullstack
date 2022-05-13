import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    destroyNotification() {
      timeOutID = null
      return initialState
    },
    createNotification(state, action) {
      const message = action.payload.message
      const type = action.payload.type
      return { message: message, type: type }
    },
  },
})

let timeOutID = null

export const setNotifications = (message, type, time = 3) => {
  return (dispatch) => {
    dispatch(createNotification({message, type}))
    if (timeOutID !== null) clearTimeout(timeOutID)
    timeOutID = setTimeout(() => dispatch(destroyNotification()), time*3000)
  }
}

export const { destroyNotification, createNotification } = notificationSlice.actions
export default notificationSlice.reducer
