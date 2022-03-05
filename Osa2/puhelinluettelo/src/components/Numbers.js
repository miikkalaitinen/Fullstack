
const Person = ({ person, handleDelete }) => <p key={person.id} >{person.name} {person.number} <button onClick={() => handleDelete(person.id,person.name)}>Delete</button></p>

const Numbers = ({filterValue, persons, handleDelete}) => {

    const displayNumbers = () => {


      if(filterValue === "") {
        return (persons.map(person => 
          <Person key={person.name} person={person} handleDelete={handleDelete}/>
        ))
      }
      else {
        const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
        return (filteredPersons.map(person => 
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        ))
      }
    }

    return(
        <>
            <h2>Numbers</h2>
            {displayNumbers()}
        </>
    )
}

export default Numbers