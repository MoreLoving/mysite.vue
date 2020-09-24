<template>
  <div id="index">
    <div class="title-article list-card" v-for="blog in blog_list" :key="blog.id" >
        <div class="list-pic">
            <router-link :to="{name:'blog',params:{id:blog.id}}"  :title="blog.title">
            <img :src="imageBaseUrl+blog.image_url" class="img-full">
            </router-link>
        </div><!--list-pic-->
        <router-link :to="{name:'blog',params:{id:blog.id}}">
            <h1 v-text="blog.title"></h1>
        </router-link>
        <p>
            <router-link :to="{name:'blog',params:{id:blog.id}}" v-cloak>{{blog.pre_content+" ..."|removeTag}}</router-link>
        </p>
        <div class="title-msg">
            <span><i class="layui-icon"></i> <router-link :to="{name:'category',params:{type:blog.type}}" v-text="blog.type"></router-link></span>
            <span ><i class="layui-icon"></i> {{ blog.created_time | dateFormat }}</span>
            <span class="layui-hide-xs" v-cloak><i class="layui-icon"></i> {{blog.num}}℃</span>
            <span class="layui-hide-xs" v-cloak><i class="layui-icon"></i> {{blog.comments}}条</span>
        </div><!--title-msg-->

    </div><!----title-article-->
   
  </div>
</template>
<script>
import {request} from '../network/index'
import config from '../network/config'
export default {
    name: "index",
    data(){
        return {
            baseUrl:config.baseUrl,
            imageBaseUrl:config.imageBaseUrl,
            blog_list:[],
        }
    },
    mounted(){
        request({
            url:"/api/head_blog/",
            method:"get",
        })
        .then( res => {
            this.blog_list = res.data.results
            // console.log(this.blog_list)
        }).catch( err => {
            console.log("index error")
            console.log(err)
        })
    },
    activated(){
        this.bus.$emit("ChangeActive", "index")

    }
}
</script>