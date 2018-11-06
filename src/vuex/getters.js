const getters = {
    name: state => state.user.name,
    uid: state => state.user.uid,
    token: state => state.user.token,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    siderbar_routers:state => state.permission.siderbar_routers,
}
export default getters