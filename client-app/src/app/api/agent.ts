import axios, {AxiosError, AxiosResponse} from "axios";
import {store} from "../stores/store";
import {User, UserFormValues} from "../models/user";
import {router} from "../router/Routes";
import {toast} from "react-toastify";
import {CreateFarmResponse, Farm} from "../models/farm";
import {CreateSeasonResponse, Season} from "../models/season";
import {CreateFieldResponse, Field} from "../models/field";
import {Operation} from "../models/operation";


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
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Farms = {
    list: () => requests.get<Farm[]>('/farms'),
    details: (id: string) => requests.get<Farm>(`/farms/${id}`),
    create: (farm: Farm) => requests.post<CreateFarmResponse>(`/farms`, farm),
    update: (farm: Farm) => requests.put<void>(`/farms`, farm),
}

const Seasons = {
    list: (params?: SeasonParams) => {
        if (!params || !params.farmId) {
            return axios.get<Season[]>('/seasons').then(responseBody);
        } else {
            return axios.get<Season[]>(`/seasons?farmId=${params.farmId}`).then(responseBody);
        }
    },
    details: (id: string) => requests.get<Season>(`/seasons/${id}`),
    create: (season: Season) => requests.post<CreateSeasonResponse>(`/seasons`, season),
    update: (season: Season) => requests.put<void>(`/seasons`, season),
}
const Fields = {
    list: (params?: FieldParams) => {
        if (!params || !params.farmId) {
            return axios.get<Field[]>('/fields').then(responseBody);
        } else {
            return axios.get<Field[]>(`/fields?farmId=${params.farmId}`).then(responseBody);
        }
    },
    details: (id: string) => requests.get<Field>(`/fields/${id}`),
    create: (field: Field) => requests.post<CreateFieldResponse>(`/fields`, field),
    update: (field: Field) => requests.put<void>(`/fields`, field),
}

const Operations = {
    list: (params?: OperationParams) => {
        if (!params || !params.seasonId) {
            return axios.get<Operation[]>('/operations').then(responseBody);
        } else {
            return axios.get<Operation[]>(`/operations?seasonId=${params.seasonId}`).then(responseBody);
        }
    }
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