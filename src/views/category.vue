<template>
    <div id="category">
        <div>
            <div class="title-article list-card"  v-for="blog in blog_list" :key="blog.id" >
                <div class="list-pic">
                    <router-link :to="{name:'blog',params:{id:blog.id}}"  :title="blog.title">
                    <img :src="baseUrl+blog.image_url" alt="Typecho 标签云如何随机展示固定个数的标签？" class="img-full">
                    </router-link>
                </div><!--list-pic-->
                <router-link :to="{name:'blog',params:{id:blog.id}}">
                    <h1 v-text="blog.title"></h1>
                </router-link>
                <p>
                    <router-link :to="{name:'blog',params:{id:blog.id}}" v-cloak>{{blog.pre_content+' ...'|removeTag}}</router-link>
                </p>
                <div class="title-msg">
                    <span><i class="layui-icon"></i> <router-link :to="{name:'category',params:{type:blog.type}}"  v-text="blog.type"></router-link></span>
                    <span ><i class="layui-icon"></i> {{ blog.created_time | dateFormat }}</span>
                    <span class="layui-hide-xs" v-cloak><i class="layui-icon"></i> {{blog.num}}℃</span>
                    <span class="layui-hide-xs" v-cloak><i class="layui-icon"></i> {{blog.comments}}条</span>
                </div><!--title-msg-->

            </div><!----title-article-->
        </div>
        <div class="post" v-if="nothing">
            <h2 class="post-title">没有找到内容</h2>
        </div>
    </div>
</template>

<script>
import {request} from '../network/index'
import config from '../network/config'
export default {
    name: "category",
    data(){
        return{
            baseUrl:config.baseUrl,
            type:"",
            blog_list:[],
            nothing:false,
        }
    },
    activated(){
        this.type = this.$route.params.type
        request({
            url:"/api/blog_list/"+this.type+"/",
            method:"get",
        }).then(res => {
            this.blog_list = res.data.results
            this.bus.$emit("ChangeBreadcrumb",[this.type])
            this.nothing = this.blog_list==0
            // console.log(res)
        }).catch(err => {
            console.log("category error")
            console.dir(err)
        })
    },
    beforeRouteUpdate(to,from,next){
        this.type = to.params.type
        request({
            url:"/api/blog_list/"+this.type+"/",
            method:"get",
        }).then(res => {
            this.blog_list = res.data.results
            this.bus.$emit("ChangeBreadcrumb",[this.type])
            this.nothing = this.blog_list==0
            // console.log(res)
        }).catch(err => {
            console.log("category error")
            console.dir(err)
        })
        next()
    }
}
</script>