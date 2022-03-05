import axios from 'axios'

const getAll = () => axios.get("http://localhost:3001/persons").then(res => res.data)

const newPerson = newPerson => axios.post("http://localhost:3001/persons", newPerson).then(res => res.data)

const deletePerson = personid => axios.delete(`http://localhost:3001/persons/${personid}`).then(res => res)

const updatePerson = (personid, updatedPerson) => axios.put(`http://localhost:3001/persons/${personid}`, updatedPerson).then(res => res.data)

const services = { getAll, newPerson, deletePerson, updatePerson}

export default services