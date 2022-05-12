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
  const currentToken = token
  const response = await axios.post(baseUrl, newBlog, { headers: { authorization: currentToken } })
  return response.data
}

const updateBlog = async (id, newBlog) => {
  const currentToken = token
  const response = await axios.put(`${ baseUrl }/${id}`, newBlog,  { headers: { authorization: currentToken } })
  return response.data
}

const deleteBlog = async (id) => {
  const currentToken = token
  const response = await axios.delete(`${ baseUrl }/${id}`, { headers: { authorization: currentToken } })
  return response.data
}

export default { getAll, setToken, postNew, updateBlog, deleteBlog }