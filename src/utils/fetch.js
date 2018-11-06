import axios from 'axios';
import vue from 'vue';

//修改默认的地址为http://192.168.1.47:5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 创建axios实例
const service = axios.create({
    baseURL: "/", // api的base_url  修改默认的地址为http://192.168.1.47:5000
    timeout: 5000,             // 请求超时时间
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,OPTIONS"
    }
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error);// for debug
        if (error.response.status == 401) {
           location.href = '/#login'
        } else
            vue.$Message.error({
                message: error.message,
                duration: 5 * 1000,
                closable: true
            });
        return Promise.reject(error);
    }
)

export default service;
