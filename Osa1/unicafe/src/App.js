import { useState } from 'react'

const Button = ({ setState, text, state }) => {
  return (
    <button onClick={() => setState(state + 1)}>
      {text}
    </button>
  )
}


const StatisticLine = ({ text, value }) => <tr><td>{text} {value}</td></tr>


const Statistics = ({ good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = (1*good+(-1)*bad)/all
  const positive = good/all*100 + "%"

  if(all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <h3>No feedback has been given yet!</h3>
      </>
    )
  }

  return(
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good}/>
          <StatisticLine text={"Neutral"} value={neutral}/>
          <StatisticLine text={"Bad"} value={bad}/>
          <StatisticLine text={"All"} value={all}/>
          <StatisticLine text={"Average"} value={average}/>
          <StatisticLine text={"Positive"} value={positive}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe Feedback</h1>
      <p>Give feedback by pressing buttons</p>

      <Button setState={setGood} state={good} text={"good"} />
      <Button setState={setNeutral} state={neutral} text={"neutral"} />
      <Button setState={setBad} state={bad} text={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App