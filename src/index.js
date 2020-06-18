import Vue from 'vue';  
import myVideo from "./components/video";   

/** 
 * 项目运行
 * 
 **/ 
new Vue({
   el: "#root", 
   render: h => h(myVideo)
}); 


/** 
 * 打包插件
 * 
 **/

window.Promise = Promise;
const components = [myVideo];    
let common = {};
common.install = (Vue, options)=>{  
     //注册全局方法 
    components.forEach((item)=>{
        Vue.component(item.name, item); 
    }); 
}
if(window.Vue){
   Vue.use(common);  
}
export default common;

 

