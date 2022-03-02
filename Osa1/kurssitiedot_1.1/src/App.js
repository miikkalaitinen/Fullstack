const Header = ({ coursename }) => {
  return(
    <h1>{coursename}</h1>
  )
}

const Part = ({ part}) => {
  return(
    <p>
        {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts}) => {
  return (
  <div>
    {parts.map((part, index) => <Part key={index} part={part}/>)}
  </div>
  )
}

const Total = ({ parts }) => {
  return(
    <p>Number of exercises {parts.map(_ => _.exercises).reduce((a,b) => a + b)} </p> 
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header coursename={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
