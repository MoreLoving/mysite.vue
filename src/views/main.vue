<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

    <!-- Header -->
    <div v-if="not_found">
      <notfound></notfound>
    </div>
    <div v-else>
      <myheader></myheader>
      <mycontainer></mycontainer>
      <backtop></backtop>
    </div>
  </div>
</template>

<script>
export default {
    name: "app",
    data(){
      return{
        not_found:false,
      }
    },
    mounted(){
      
    },
    methods: {},
    components:{
      "myheader": () => import(/* webpackChunkName: "myheader" */ './myheader'),
      "mycontainer": () => import(/* webpackChunkName: "mycontainer" */ './mycontainer'),
      "backtop": () => import(/* webpackChunkName: "mycontainer" */ './backtop'),
      "notfound": () => import(/* webpackChunkName: "404" */ './notfound'),
    }
}
</script>
