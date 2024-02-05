import axios, {AxiosResponse} from "axios";
import {store} from "../stores/store";
import {User, UserFormValues} from "../models/user";
import {Farm} from "../models/farm";


axios.defaults.baseURL = 'http://localhost:5129/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;

    return config;
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Farms = {
    list: () => requests.get<Farm[]>('/farms'),
}

const Account = {
    login: (user: UserFormValues) => requests.post<User>('/account/signIn', user),
    register: (user: UserFormValues) => requests.post<User>('/account/signUp', user)
}

const agent = {
    Account,
    Farms
}

export default agent;