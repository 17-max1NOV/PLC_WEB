import axios from "axios";
const APILink =axios.create({
    baseURL: 'http://localhost:4000/',
})
export default APILink;
