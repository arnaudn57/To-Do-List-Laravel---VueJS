import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token") || ""
    }
});

export default Axios;
