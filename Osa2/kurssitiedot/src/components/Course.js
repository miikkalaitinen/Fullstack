const Header = ({ coursename }) => {
    return(
      <h2>{coursename}</h2>
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
  
  const Course = ({ course }) => {
    return(
      <>
        <Header coursename={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

  export default Course