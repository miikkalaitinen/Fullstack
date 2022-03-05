import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Numbers from './components/Numbers'
import services from './services/personService'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

  const handleNameChange = (e) => {setNewName(e.target.value)}

  const handleFilterChange = (e) => setFilterValue(e.target.value)

  const handleNewNumber = (e) => setNewNumber(e.target.value)

  useEffect(() => {

    services.getAll()
    .then(res => setPersons(res))
    .catch(err => console.log(err))

  },[])

  const handleDelete = (id, name) => {

    if(window.confirm(`Delete ${name}?`)) {
      services.deletePerson(id)
      .then(res => {
        setPersons(persons.filter(person => person.id !== id))
        notify(`Deleted ${name}`,true)
      })
      .catch(err => {
        console.log(err)
        notify(`Failed to delete ${name}`,false)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already in the phonebook, update their number?`)) {
        
        const id = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id
        handleUpdate(id)
      }
    }

    else {

      const person = { name: newName, number: newNumber}

      services.newPerson(person)
      .then(res => {
        setPersons(persons.concat(res))
        notify(`Added ${person.name} with number ${person.number}`,true)
      })
      .catch(err => {
        console.log(err)
        notify(`Failed to add ${person.name}`,false)
      })

      setNewName('')
      setNewNumber('')
    }

  }

  const handleUpdate = (id) =>{

    const person = { name: newName, number: newNumber}

    services.updatePerson(id,person)
    .then(res => {
      notify(`Updated ${person.name}'s phone number to ${person.number}`,true)
      setPersons(persons.map(person => person.id !== res.id ? person : res))
    })
    .catch(err => {
      console.log(err)
      notify(`Failed to update ${person.name}'s phone number to ${person.number}`,false)
    })
  }

  const notify = (message, type) => {
    setNotification({message: message, type: type})
    setTimeout(() => setNotification({message: null, type: null}),3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
        filter by name: <input value={filterValue} onChange={handleFilterChange}></input>
      </div>
      <Form
        handleNameChange={handleNameChange}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <Numbers filterValue={filterValue} persons={persons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App