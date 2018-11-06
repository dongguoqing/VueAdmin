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
        method: 'get',
        params
    });
}

export const removeUser = params => {
    return fetch({
        url: '/LoginService/User/GetUserList',
        method: 'get',
        params
    });
};

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

//编辑用户
export  function editUser(data) {
    return fetch({
        url: '/LoginService/User/EditUser',
        method: 'post',
        data
    })
}

//新增用户
export const addUser = params => {
    return fetch({
        url: '/LoginService/User/AddUser',
        method: 'post',
        params
    })
}
