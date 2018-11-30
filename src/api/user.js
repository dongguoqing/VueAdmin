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

//根据条件筛选用户列表
export const getUserListByWhere = params => {
    return fetch({
        url: '/LoginService/User/GetList',
        method: 'get',
        params
    })
}

//删除用户
export const removeUser = params => {
    return fetch({
        url: '/LoginService/User/DelUser',
        method: 'get',
        params
    });
};

//批量删除用户
export const batchRemoveUser = params => {
    return fetch({
        url: '/LoginService/User/BatchDelUser',
        method: 'get',
        params
    });
};

//编辑用户
export function editUser(data) {
    return fetch({
        url: '/LoginService/User/EditUser',
        method: 'post',
        data
    })
}

//新增用户
export const addUser = params => {
    var data = params
    return fetch({
        url: '/LoginService/User/AddUser',
        method: 'post',
        data
    })
}
