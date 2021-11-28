import axios from 'axios'

export const connectBack = axios.create({
  baseURL: 'http://localhost:3001/',
	headers: {
		'Content-Type': 'application/json'
	}
})