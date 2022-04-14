import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newtoken) => {
  token = `bearer ${newtoken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postNew = async (newBlog) => {

  const response = await axios.post(baseUrl, newBlog, {headers: { authorization: token }})
  return response.data
}

const updateBlog = async (id, newBlog) => {
  const response = await axios.put(`${ baseUrl } /${id}`, newBlog,  {headers: { authorization: token }})
  return response.data
}

export default { getAll, setToken, postNew, updateBlog }