import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	message: '',
	display: 'none'
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		destroyNotification(state, action) {
			timeOutID = null
			return initialState	
		},
		createNotification(state, action) {
			const message = action.payload
			return { message: message, display: 'block'}
		}
	}
})

let timeOutID = null

export const setNotifications = (content, time) => {
	return dispatch => {
		dispatch(createNotification(content))
		if (timeOutID !== null) clearTimeout(timeOutID)
		timeOutID = setTimeout(() => dispatch(destroyNotification(content)), time)
	}
}

export const { destroyNotification, createNotification } = notificationSlice.actions
export default notificationSlice.reducer