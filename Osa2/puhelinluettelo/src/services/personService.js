import axios from 'axios'

const baseURL = "/api/persons"

const getAll = () => axios.get(baseURL).then(res => res.data)

const newPerson = newPerson => axios.post(baseURL, newPerson).then(res => res.data)

const deletePerson = personid => axios.delete(`${baseURL}/${personid}`).then(res => res)

const updatePerson = (personid, updatedPerson) => axios.put(`${baseURL}/${personid}`, updatedPerson).then(res => res.data)

const services = { getAll, newPerson, deletePerson, updatePerson}

export default services