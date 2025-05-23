import axios from 'axios';

const API =  axios.create({
    baseURL: 'http://localhost:8000/api/',
})

export const UserSignUp =  async (data) =>API.post('/user/signup',data)

export const UserSignIn =  async (data) =>API.post('/user/signin',data)

export const getDashboardDetails = async (token) => {
  return await API.get('/user/dashboard',{
        headers :{Authorization: `Bearer ${token}`}
    })
}
export const getWorkouts = async (token,date) => {
  return await  API.get(`/user/workout/${date}`,{
        headers :{Authorization: `Bearer ${token}`}
    })
}
export const addWorkouts = async (token,data) => {
   const response= API.post(`/user/workout`,data,{
        headers :{Authorization: `Bearer ${token}`}
    })
     return response.data; 
}