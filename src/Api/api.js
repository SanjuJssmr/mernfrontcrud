import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
    baseURL: "https://mernrestapi.onrender.com/",
});

export default API;