import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'


const store = createStore(reducer)

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

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
