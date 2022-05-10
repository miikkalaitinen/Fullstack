import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleAdd = async (e) => {

        e.preventDefault()
        const content = e.target.text.value

        e.target.text.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={(e) => handleAdd(e)}>
            <div><input name="text"/></div>
            <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm