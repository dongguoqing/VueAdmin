import Vue from 'vue'
import Vuex from 'vuex'
import  getters from './getters'
// import permission from './modules/permission'
import Cookies from 'js-cookie';
import user from './modules/user';

Vue.use(Vuex)



// 创建 store 实例
export default new Vuex.Store({
    modules: {
        user,
        //permission
    },
    getters,
})