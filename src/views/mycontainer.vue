<template>
  <div class="mycontainer">
    <div class="layui-container" style="height: auto !important;">
      <div class="layui-row layui-col-space15 main" style="height: auto !important;">
        <!--left-->
        <div class="layui-col-md9 layui-col-lg9">
          <breadcrumb v-if="breadcrumbShow"></breadcrumb>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div><!--layui-col-md9-->

        <!--right-->
        <div class="sidebar layui-col-md3 layui-col-lg3" style="height: auto !important;">
          <search></search>
          <column></column>
          <dynamic></dynamic>
          <tags></tags>
          <links></links>
        </div><!--layui-col-md3-->
      </div><!--layui-row-->
    </div><!--layui-container-->
  </div><!--mycontainer-->

</template>

<script>



export default {
  name: 'mycontainer',
  data(){
    return{
      breadcrumbShow: true,
    }
  },
  components:{
    "column": () => import(/* webpackChunkName: "sidebar" */ './sidebar/column'),
    "dynamic": () => import(/* webpackChunkName: "sidebar" */ './sidebar/dynamic'),
    "links":() => import(/* webpackChunkName: "sidebar" */ './sidebar/links'),
    "search": () => import(/* webpackChunkName: "sidebar" */ './sidebar/search'),
    "tags": () => import(/* webpackChunkName: "sidebar" */ './sidebar/tags'),
    "breadcrumb": () => import(/* webpackChunkName: "mycontainer" */'./breadcrumb'),
  },
  mounted(){
    if(this.$route.name=="index"){
      this.breadcrumbShow = false
    }else{
      this.breadcrumbShow = true
    }
  },
  watch:{
    "$route":function(){
      if(this.$route.name=="index"){
        this.breadcrumbShow = false
      }else{
        this.breadcrumbShow = true
      }
    }
  }
}
</script>
