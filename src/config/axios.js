import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://api-takeanote.com/'
    // baseURL : 'https://api.lamilanesa.net/'
    // baseURL : 'https://api-midgar.manganess.com/'
});

export default clienteAxios;