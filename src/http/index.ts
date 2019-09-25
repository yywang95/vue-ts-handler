import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const host = '';
const test = '';

export interface RequestInstance {
    Axios: AxiosInstance
    get(url: string, data?: object, config?: object): Promise<any>
    post(url: string, data?: object, config?: object): Promise<any>
    upload(url: string, data?: object, config?: object): Promise<any>
}

class Request implements RequestInstance {
    Axios: AxiosInstance

    constructor() {
        this.Axios = axios.create({
            responseType: 'json',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 20000,
        });
        this.initAxios();
    }

    /**
     * 初始化axios配置、请求拦截器
     */
    initAxios() {
        // 请求拦截器
        this.Axios.interceptors.request.use(
            (config) => {
                if (!config.url) {
                    throw new Error('url is error!');
                }

                // url处理：加请求域名
                let { url } = config;

                if (!/^(https?:)?\/\//.test(url)) {
                    url = `${host}${url}`;
                }

                config.url = url;

                // 参数处理：统一加test参数
                const { params } = config;

                config.params = Object.assign({
                    test,
                    [`${(+new Date()).toString(36).substr(3)}`]: '', // 避免IE缓存
                }, params);

                // 处理 headers
                config.headers.reqfrom = '...';

                return config;
            },
            err => Promise.reject(err),
        );

        // 响应拦截器
        this.Axios.interceptors.response.use(
            res => res,
            err => Promise.reject(err),
        );
    }

    /**
     * axios get请求封装
     * @param {String} url
     * @param {Object} data
     * @param {Object} config
     */
    get(url: string, data = {}, config = {}) {
        config = Object.assign({ params: data }, config);

        return this.Axios.get(url, config)
            .then(res => res.data);
    }

    /**
     * axios post请求封装
     * @param {String} url
     * @param {Object} data
     * @param {Object} config
     */
    post(url: string, data = {}, config = {}) {
        data = qs.stringify(data);

        return this.Axios.post(url, data, {
            ...{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            },
            ...config,
        })
            .then(res => res.data);
    }

    /**
     * axios post 图片上传请求封装
     * @param {String} url
     * @param {Object} formData
     * @param {Object} config
     */
    upload(url: string, formData: FormData, config = {}) {
        return this.Axios.post(url, formData, {
            ...{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
            ...config,
        })
            .then(res => res.data);
    }
}

export default new Request();
