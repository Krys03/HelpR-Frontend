import axios from 'axios'

export const connectBack = axios.create({
  baseURL: 'https://helpr-2021.herokuapp.com/',
	headers: {
		'Content-Type': 'application/json'
	}
})