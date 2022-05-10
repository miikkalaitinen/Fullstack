import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const object = action.payload
      return state.map(a => 
        a.id === object.id ? object : a
        ) 
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await noteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await noteService.createNew({ content: content,votes: 0 })
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await noteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { updateAnecdote , setAnecdotes, appendAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer