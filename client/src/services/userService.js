import axios from 'axios';

export default {
  signup: async (user) => {
    let res = await axios.post(`/api/user`, user);
    return res.data || [];
  },
  checkEmail: async (email) => {
    let res = await axios.get(`/api/user/${email}`) ;
    return res.data || [];
  },
  signin: async (user) => {
    let res = await axios.post(`/api/user/signin`, user) ;
    return res.data || [];
  }

}