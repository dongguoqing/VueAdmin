import fetch from '../utils/fetch';

//获取所有的部门列表
export function getDeptList() {
    return fetch({
        url: '/LoginService/Organize/GetOrganizeList',
        type: 'get',
    })
}

//获取所有公司列表
export function getCompanyList() {
    return fetch({
        url: '/LoginService/Organize/GetCompanyList',
        type: 'get'
    })
}

//获取所有岗位列表
export function getDutyList() {
    return fetch({
        url: '/LoginService/Organize/GetDutyList',
        type: 'get'
    })
}