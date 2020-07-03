import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/markdown/github-markdown.min.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// mavonEditor
Vue.use(mavonEditor)

Vue.prototype.window = window
Vue.prototype.layui = window.layui


// 兄弟组件间传指
let bus = new Vue()
Vue.prototype.bus = bus

// 全局路由改变
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    scrollTo(0,0);
    document.title = to.meta.title + "-Joker";
  }
  
  next()
})

//时间过滤器
Vue.filter('dateTimeFormat', (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})
Vue.filter('dateTimeFormat2', (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var x = 'AM'
  if(h>12){
    x = 'PM'
  }
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + x;
})
Vue.filter('dateTimeFormat3', (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '年' + timeAdd0(m) + '月' + timeAdd0(d) + '日 ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d);
})
Vue.filter('removeTag', (str) => {
  return str.replace(/<.*?>/g, '')
})
