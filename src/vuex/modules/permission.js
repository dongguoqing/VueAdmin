import { asyncRouterMap, constantRouterMap } from 'src/routes';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role)
        return roles.some(role => route.meta.role.indexOf(role) > 0);
    else
        return true;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length > 0) {
                filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    })
    return accessRouters
}

function getNowRouter(asyncRouterMap, to) {
    return asyncRouterMap.some(route => {
        if (to.path.indexOf(route.path) !== -1)
            return true;
        else if (route.children && route.children.length > 0)
            return getNowRouter(route.children, to);
    })
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        siderbar_routers: [],
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        },
        SET_NOW_ROUTERS: (state, to) => {
            // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
            state.addRouters.forEach(e => {
                if (e.children && e.children.length) {
                    if (getNowRouter(e.children, to) === true)
                        state.siderbar_routers = e;
                }
            })


        }

    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                let accessedRouters
                //循环获取的角色Roles 判断当前的角色的权限路由
                let isSupermanager = false;
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].RoleName.indexOf("管理员"))
                        isSuperManager = true;
                }
                //根据相应的权限获取相应的路由
                if (isSuperManager) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        },
        getNowRoutes({ commit }, data) {
            return new Promise(resolve => {
                //data => to
                commit('SET_NOW_ROUTERS', data);
                resolve();
            })
        },
    }
}

export default permission;
