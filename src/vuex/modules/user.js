import { resolve } from "url";
import Cookies from 'js-cookie'
import { getUserInfo, requestLogin } from '../../api/user'

//定义用户实体
const user = {
    state: {
        uid: Cookies.get("uid"),
        token: Cookies.get("Admin-Token"),
        name: '',
        roles: [],
        user: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UID: (state, uid) => {
            state.uid = uid;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },
    actions: {
        //根据用户名或者邮箱进行登录
        LoginBy({ commit }, userInfo) {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                requestLogin(email, userInfo.password).then(response => {
                    const data = response.data;
                    Cookies.set('uid', data.result.uid);
                    Cookies.set('Admin-Token', data.Result.Access_token);
                    commit('SET_TOKEN', data.Result.Access_token)
                    commit('SET_UID', data.Result.Uid);
                    resolve(response)
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.uid).then(response => {
                    const data = response.data;
                    commit('SET_ROLES', data.F_FullName);
                    commit('SET_NAME', data.F_RealName);
                    commit('SET_UID', data.Id);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    Cookies.remove('Admin-Token');
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            })
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('Admin-Token');
                alert("请重新登录！");
                resolve();
            });
        },
        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                commit('SET_TOKEN', role);
                Cookies.set('Admin-Token', role);
                resolve();
            })
        }
    }
}

export default user