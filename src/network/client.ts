import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_API_URL

const client = axios.create({
  baseURL: apiUrl
})

client.interceptors.response.use(response => response.data)

export default client