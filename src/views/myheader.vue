<template>
  <div class="myheader">
    <div class="layui-header header">
      <div class="layui-main">
        <router-link class="logo" to='/'>printf("Joker");</router-link>
                
        <ul class="layui-nav" ref="ul">
          <li :class="baseClass + (activeIndex==0 ? 'layui-this':'')">
            <router-link to="/">首页</router-link>
          </li>
          <li :class="baseClass + (activeIndex==1 ? 'layui-this':'')">
            <router-link to="/archives">所有文章</router-link>
          </li>
          <li :class="baseClass + (activeIndex==2 ? 'layui-this':'')">
            <router-link to="/dynamic">我的动态</router-link>
          </li>
          <li :class="baseClass + (activeIndex==3 ? 'layui-this':'')">
            <router-link to="/message">留言板</router-link>
          </li>
          <!-- <li :class="baseClass + (activeIndex==0 ? 'layui-this':'')">
            <a href="#" title="友链">友链</a> 
          </li>
          <li :class="baseClass + (activeIndex==0 ? 'layui-this':'')">
            <a href="#" title="关于">关于</a> 
          </li> -->
                      
          <li class="layui-nav-item nav-btn layui-hide-sm">
            <a href="javascript:;"><i class="layui-icon layui-icon-more"></i><span class="layui-nav-more"></span></a>
            <dl class="layui-nav-child">
              <dd><router-link to="/">首页</router-link></dd>
              <dd><router-link to="/archives">所有文章</router-link></dd>
              <dd><router-link to="/dynamic">我的动态</router-link></dd>
              <dd><router-link to="/message">留言板</router-link></dd>
              <!-- <dd><a href="#">友链</a></dd>
              <dd><a href="#">关于</a></dd> -->
            </dl>
          </li>
          <span class="layui-nav-bar" style="left: 10px; top: 59px; width: 0px; opacity: 0;"></span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myheader',
  data(){
    return {
      activeIndexDict:{"index":0,"archives":1,"dynamic":2,"message":3},
      activeIndex: -1,
      baseClass: "layui-nav-item layui-hide-xs ",
    }
  },
  mounted(){
    // 兄弟组件间通信
    let self = this
    this.bus.$on("ChangeActive", function(name){
      self.activeIndex = self.activeIndexDict[name]
    })
  }
}
</script>
