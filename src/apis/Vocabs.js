import axios from "axios";
import { api } from "../config/axios";
import querystring from 'query-string'

const HEROKU_HOST = "https://react-native-dic.herokuapp.com"
const LOCAL_HOST = "http://localhost:5000"

const getDics = () => {
    return api.get(`${HEROKU_HOST}/dic`)
}

const addDic = (data) => {
    return axios.post(`${HEROKU_HOST}/dic/create`,querystring.stringify(data));
}

const getDic = (id) => {
    return api.get(`${HEROKU_HOST}/dic/show/${id}`)
}

const showWordsByTag = (tagId) => {
    return axios.get(`${HEROKU_HOST}/dic/show-word-by-tag/${tagId}`)
    
}

export const vocabAPI = {
    getDics,
    addDic,
    getDic,
    showWordsByTag
}