import axios, { AxiosResponse } from 'axios';

class ApiService {

    private axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/',
    });
    
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

    setToken(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    resetToken(): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = '';
    }
}

const api = new ApiService();
export default api;