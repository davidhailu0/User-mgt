import axios from "axios";

const BASE_REST_API_URL = process.env.REACT_APP_API_URL;

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export const getToken = () => localStorage.getItem("token");
  
export const getAllPayment = () => axios.get(BASE_REST_API_URL + "/api/v1/hajjList")

export const getProfile = () => axios.get(BASE_REST_API_URL + "/api/auth/profile")

export const makeTransation = (data) => axios.post(BASE_REST_API_URL + "/api/v1/make_hajj_trans", data)
export const authorizeTransation = (data) => axios.post(BASE_REST_API_URL + "/api/v1/Check_hajj_trans", data)

export const getHujjaj = (code) => {
  const url = BASE_REST_API_URL + '/api/v1/get_hujaj/' + code;
 
  return axios.get(url);
};
export const getUnpaidHujjaj = () => {

  const url = BASE_REST_API_URL + '/api/v1/hajjList/unpaid';
 
  return axios.get(url);
};
export const getPaidHujjaj = () => {
  
  const url = BASE_REST_API_URL + '/api/v1/hajjList/paid';
 
  return axios.get(url);
};
export const getSlip = (code) => {
  
  const url = BASE_REST_API_URL + '/api/v1/payment_code/' + code;


  return axios.get(url);
};
export const getNameQuery = (code) => {
  
  const url = BASE_REST_API_URL + '/api/v1/get_nameQuery/' + code;


  return axios.get(url);
};

export const updateTodo = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')