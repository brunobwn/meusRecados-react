import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User';
import { UserAuth } from '../app/reducers/authSlice';

class ApiService {

    private axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/',
        headers: {
            "Content-type": "application/json"
        }
    });
    private userId: string | null = null;
    constructor() {}
    
    public get<T>(url: string, config?: any): Promise<T> {
        return this.axiosInstance.get(url, config).then((response) => response.data);
    }

    async login(email:string, password: string): Promise<AxiosResponse>{
        return this.axiosInstance.post('auth/login', {email, password});
    }

    async register(name:string, email:string, password: string, avatar?:string): Promise<AxiosResponse>{
        return this.axiosInstance.post('auth/register', {name, email, password, avatar});
    }

    async getAllMessages(): Promise<AxiosResponse> {
        if(!this.userId) return Promise.reject('Usuário não autenticado');
        return this.axiosInstance.get(`user/${this.userId}/messages`);
    }

    async createMessage(message:{subject:string, text:string}): Promise<AxiosResponse>{
        if(!this.userId) return Promise.reject('Usuário não autenticado');
        return this.axiosInstance.post(`user/${this.userId}/messages`, message);
    }

    async updateMessage({id, ...message}:{id:string, subject:string, text:string}): Promise<AxiosResponse>{
        if(!this.userId) return Promise.reject('Usuário não autenticado');
        return this.axiosInstance.patch(`user/${this.userId}/messages/${id}`, message);
    }

    async toggleStatusMessage(messageId:string): Promise<AxiosResponse>{
        if(!this.userId) return Promise.reject('Usuário não autenticado');
        return this.axiosInstance.patch(`user/${this.userId}/messages/${messageId}`);
    }

    setUser(user:UserAuth | null | undefined, token: string | null | undefined): void {
        if(token && user) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            this.userId = user.id;
        } else {
            this.axiosInstance.defaults.headers.common['Authorization'] = '';
            this.userId = null;
        }
    }
}

const api = new ApiService();
export default api;