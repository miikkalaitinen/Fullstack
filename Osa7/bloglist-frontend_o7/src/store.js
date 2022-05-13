import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import toggableReducer from './reducers/toggableReducer'


const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        togglable: toggableReducer
    }
})


export default store