import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (content) => {
        dispatch(voteAnecdote(content))
        dispatch(setNotifications(content.content,4000))
    }

    return(
        <>
            <h2>Anecdotes</h2>
            Filter Anecdotes: <Filter />
            {[...anecdotes].filter(a => String(a.content).toLowerCase().includes(filter.toLowerCase())).sort((a,b) => (a.votes > b.votes ? -1 : 1)).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList