// It is just a functional module not a component - Meaning it is only for a particular utility

import axios from "axios";

// Base URL to make requests to the movie database
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export default instance;





/* 
1. Axios: Axios is a Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6. It can be used intercept HTTP requests and responses and enables client-side protection against XSRF. It also has the ability to cancel requests.

2. GET request: instance.get('/faraz-hussain')
Means: https://api.themoviedb.org/3/faraz-hussain
Basically, it is taking '/faraz-hussain' and appending it to base URL

3. We can only have one default export 
*/