import axios from "axios";

const httpClient = axios.create({
    baseURL:"/api/tasks"
})

export default httpClient