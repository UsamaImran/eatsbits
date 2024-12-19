import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

type RequestBody = Record<string, unknown> | unknown[];

type QueryParams =
  | string
  | Record<string, string>
  | string[][]
  | URLSearchParams
  | undefined;

export class Api {
  private axiosInstance: AxiosInstance;

  constructor(config: CreateAxiosDefaults<any> | undefined) {
    this.axiosInstance = axios.create(config);
  }

  private async request<TResponse, TData extends RequestBody = RequestBody>(
    method: Method,
    url: string,
    data?: TData,
    queryParams?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      url += `?${queryString}`;
    }

    const response: AxiosResponse<TResponse> = await this.axiosInstance.request(
      {
        method,
        url,
        data,
        ...config,
      }
    );
    return response.data;
  }

  updateHeaders(config?: Record<string, string>): void {
    if (config) {
      this.axiosInstance.defaults.headers = {
        ...this.axiosInstance.defaults.headers,
        ...config,
      };
    }
  }

  get<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    queryParams?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return this.request<TResponse, TData>(
      'get',
      url,
      undefined,
      queryParams,
      config
    );
  }

  post<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    data?: TData,
    queryParams?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return this.request<TResponse, TData>(
      'post',
      url,
      data,
      queryParams,
      config
    );
  }

  put<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    data?: TData,
    queryParams?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return this.request<TResponse, TData>(
      'put',
      url,
      data,
      queryParams,
      config
    );
  }

  patch<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    data?: TData,
    queryParams?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return this.request<TResponse, TData>(
      'patch',
      url,
      data,
      queryParams,
      config
    );
  }

  delete<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    queryParams?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return this.request<TResponse, TData>(
      'delete',
      url,
      undefined,
      queryParams,
      config
    );
  }

  addinterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('Request was made');
        return config;
      },
      (error) => {
        console.log('Request was not made');
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
