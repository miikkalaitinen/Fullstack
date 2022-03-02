import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))
  const [mostVoted, setMostVoted] = useState([-1,0])

  const handleRandomClick = () => {
    const randomInt = () => Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInt)
  }

  const handleVoteClick = () => {
    const newPoints = {...points}

    newPoints[selected] += 1


    if(newPoints[selected] > mostVoted[0]) setMostVoted([newPoints[selected],selected])
    if(newPoints[selected] === mostVoted[0]) setMostVoted([-1,selected])

    setPoints(newPoints)
}


  return (
    <div>
      <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>This anecdote has {points[selected]} points</p>
        <button onClick={() => handleVoteClick()}>Vote this anecdote</button>
        <button onClick={() => handleRandomClick()}>Get next anecdote</button>
      <h1>Anecdote with most points</h1>
        <p>{mostVoted[0] === -1 ? "No best anecdote" : anecdotes[mostVoted[1]] + " is the most voted with " + mostVoted[0] + " votes!"}</p>
    </div>
  )
}

export default App