import axios from "axios"
import { ValidationErrorResponse } from "./error-response"
const apiUrl = process.env.REACT_APP_BASE_API_URL

const client = axios.create({
  baseURL: apiUrl,
})

client.interceptors.response.use(response => response.data)

client.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response?.status === 400 &&
      error.response?.data?.type === "validation-error"
    ) {
      const { title, status, detail, violations } = error.response.data
      return Promise.reject(
        new ValidationErrorResponse(title, status, detail, violations)
      )
    }

    return Promise.reject(error)
  }
)

export default client
