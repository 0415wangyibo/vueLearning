import axios from 'axios';
import { Message } from 'element-ui';
import { bodyToParm } from '../tools/utils';


let instance = axios.create({
    timeout: 20000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

// 请求前拦截
instance.interceptors.request.use(
    config => {
        return config
    },
    err => {
        Message.error({ message: '请求超时!' })
        return Promise.resolve(err)
    }
);

// 返回后拦截
instance.interceptors.response.use(
    data => {
        if (data.data.code === 0) {
            return data.data
        } else {
            Message.error({ message: data.data.msg })
            return data.data
        }
    },
    err => {
        if (err.response) {
            if (err.response.status === 504 || err.response.status === 404) {
                Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
            } else if (err.response.status === 401) {
                Message.error({ message: '登录信息失效，请重新登录' });
                // window.location.href = window.location.href.replace(/#\/.*/, '#/login');
                window.location.href = location.protocol + '//' + location.host + '/#/login';
            } else if (err.response.status === 500) {
                Message.error({ message: '服务器开小差了⊙﹏⊙∥' })
            } else {
                Message.error({ message: '网络不给力，请稍后再试' })
            }
        } else {
            Message.error({ message: '网络不给力，请稍后再试' })
        }
        return Promise.reject(err)
    }
)

let base = '';

const postJSON = (url, params) => {
    return instance.request({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}

const postToken = (url, params) => {
    return instance.request({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'token'
        }
    })
}

const postRequest = (url, params) => {
    return instance.request({
        method: 'post',
        url: `${base}${url}`,
        data: bodyToParm(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
    })
}

const post = (url, params) => {
    return instance.request({
        method: 'post',
        url: url,
        data: bodyToParm(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
    })
}

const getRequest = (url, paramsBody) => {
    return instance.request({
        method: 'get',
        url: `${base}${url}${bodyToParm(paramsBody)}`,
    })
}

const multipleRequest = function (requsetArray, callback) {
    axios.all(requsetArray).then(axios.spread(callback))
}

export { getRequest, postRequest, postJSON, post, postToken, multipleRequest }
