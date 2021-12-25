import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'https://qr-c0de-server.herokuapp.com/'
});

const TOKEN = localStorage.getItem('access_token')
// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['x-access-token'] = TOKEN;
instance.defaults.headers.common['Authorization'] = TOKEN;
// Also add/ configure interceptors && all the other cool stuff
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;