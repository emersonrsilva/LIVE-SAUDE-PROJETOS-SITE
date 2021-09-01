const axios = require('axios');

var baseUrl;

if(process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
  //baseUrl = 'https://livesaude.guilhermegonzales.com.br/';

} else if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3000';
  //baseUrl = 'https://livesaude.guilhermegonzales.com.br/';

} else {
  baseUrl = 'http://localhost:3000';
  //baseUrl = 'https://livesaude.guilhermegonzales.com.br/';

}
//baseUrl = 'https://livesaude.guilhermegonzales.com.br/';
const api = axios.create({
  baseURL: baseUrl
});
const gcloud = axios.create({
  baseURL: 'https://southamerica-east1-live-saude1.cloudfunctions.net/'
});
const apiCep = axios.create({
  baseURL: 'https://viacep.com.br/'
})
const TOKEN = window.localStorage.getItem('token');

export { api, TOKEN,gcloud, apiCep };
