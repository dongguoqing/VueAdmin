
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import ElementUI from 'element-ui'
import routes from '../routes'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
  })


var ui = ElementUI
//修改默认的地址为http://192.168.1.47:5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 创建axios实例
const service = axios.create({
    baseURL: "/", // api的base_url  修改默认的地址为http://192.168.1.47:5000
    timeout: 60000,             // 请求超时时间
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
        if (error.response) {
            if (error.response.status == 401) {
                router.push("login")
            } else {
                ui.Message.error({
                    message: error.message,
                    duration: 5 * 1000,
                    closable: true
                });
            }
            return Promise.reject(error);
        }else
        ui.Message.error({
            message: '请求超时,请检查哦网络问题！',
            duration: 5 * 1000,
            closable: true
        });
    }
)

export default service;
