import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/menu`);
    return res.data || [];
  },
  saveNew: async (menu) => {
    let res = await axios.post(`/api/menu`, menu);
    return res.data || [];
  }

}