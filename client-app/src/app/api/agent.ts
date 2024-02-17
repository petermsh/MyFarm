import axios, {AxiosError, AxiosResponse} from "axios";
import {store} from "../stores/store";
import {User, UserFormValues} from "../models/user";
import {router} from "../router/Routes";
import {toast} from "react-toastify";
import {Farm} from "../models/farm";
import {Season} from "../models/season";
import {Field} from "../models/field";
import {Operation} from "../models/operation";
import {Id} from "../models/Id";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5129/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;

    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method ==='get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if(data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string, params?: {}) => axios.get<T>(url, { params }).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Farms = {
    list: () => requests.get<Farm[]>('/farms'),
    details: (id: string) => requests.get<Farm>(`/farms/${id}`),
    create: (farm: Farm) => requests.post<Id>(`/farms`, farm),
    update: (farm: Farm) => requests.put<void>(`/farms`, farm),
    delete: (id: string) => requests.delete<void>(`/farms/${id}`)
}

const Seasons = {
    list: (seasonId?: string) => requests.get<Season[]>('/seasons', { params: { seasonId } }),
    details: (id: string) => requests.get<Season>(`/seasons/${id}`),
    create: (season: Season) => requests.post<string>(`/seasons`, season),
    update: (season: Season) => requests.put<void>(`/seasons`, season),
}
const Fields = {
    list: (farmId?: string) => requests.get<Field[]>('/fields', { params: { farmId } }),
    details: (id: string) => requests.get<Field>(`/fields/${id}`),
    create: (field: Field) => requests.post<void>(`/fields`, field),
    update: (field: Field) => requests.put<void>(`/fields`, field),
}

const Operations = {
    list: (seasonId?: string) => requests.get<Operation[]>('/operations', { params: { seasonId } }),
}

const Account = {
    current: () => requests.get<User>('account'),
    login: (user: UserFormValues) => requests.post<User>('/account/signIn', user),
    register: (user: UserFormValues) => requests.post<User>('/account/signUp', user)
}

const agent = {
    Account,
    Farms,
    Seasons,
    Fields,
    Operations,
}

export default agent;