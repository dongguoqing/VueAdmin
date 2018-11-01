import fetch from '../utils/fetch';

//登录接口
export const requestLogin = params => {
    var data = {
        email: params.username,
        password: params.password,
    }
    return fetch({
        url: '/LoginService/Login/RequestToken',
        method: 'post',
        data
    })
};

//获取用户列表
export const getUserListPage = params => {
    return fetch({
        url: '/LoginService/User/GetUserList',
        method: 'post',
        params
    });
}

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };