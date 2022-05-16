import Axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import Router from 'next/router'





const api = Axios.create({
    
  baseURL: 'http://166.0.138.149:4000/', //urls[process.env.NODE_ENV],

  headers: {
    Accept: 'application/json',

    'Content-Type': 'application/json'
  }
}
)


api.interceptors.request.use(
  req => {
    console.log(`Got Request ${req.method} ${req.url}`)

    return req
  },

  error => {
    console.log('got error in request')

    if (error.response.status == 401) {
      window.localStorage.removeItem('userData')

      window.localStorage.removeItem('token')

      Router.push('/login')
    }
  }
)

api.interceptors.response.use(
  response => {
    console.log(response)

    return response
  },



  error => {
    
    console.log('got error in response')

    console.log(error.response.status)

    if (error.response.status == 401) {
        window.localStorage.removeItem('userData')

        window.localStorage.removeItem('token')
        Router.push('/login')


            
        
    }
  }
)

export default api
