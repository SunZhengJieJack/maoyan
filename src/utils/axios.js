import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_URL, // 区分开发跟生产环境（根据根目录的.env文件）
  timeout: 5000,
});

// if (process.env.NODE_ENV === 'production') {
//   baseAxios = axios.create({
//     baseURL: 'https://api.chavesgu.com/m',
//     timeout: 5000,
//   });
// } else {
//   baseAxios = axios.create({
//     baseURL: '/api',
//     timeout: 5000,
//   });
// }
export default baseAxios;
