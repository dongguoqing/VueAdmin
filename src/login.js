import router from './router'
import vue from './vue';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

//权限判断
function hasPermission(roles, permissionRoles) {
    if (String(roles).indexOf("管理员")) return true;//只要是带管理员三个字的  默认是全部的权限
    if (!permissionRoles) return true;
    return String(permissionRoles).indexOf(roles) >= 0
}

const whiteList = ['/login', '/authredirect'];//不需要进行重定向 (因为每个页面需要判断是否存在token)
//循环路由
router.beforeEach((to,from,next)=>{
    NProgress.start();
})

