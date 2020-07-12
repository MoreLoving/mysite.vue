<template>
    <div id="category">
        <div>
            <div class="title-article list-card"  v-for="blog in blog_list" :key="blog.id" >
                <div class="list-pic">
                    <router-link :to="{name:'blog',params:{id:blog.id}}"  :title="blog.title">
                    <img :src="baseUrl+blog.image_url"  class="img-full">
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
        <div>
            <i class="layui-icon layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="margin-left:50%" v-if="loading"></i>
        </div>
        <div v-if="!loading" style="text-align:center;font-size:12px;color:gray;">
            <p>到底了没有了～</p>
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
            blog_list:[],
            next:null,
            nothing:false,
            loading:false,
        }
    },
    methods:{
        get_blog(url, type, kw, append){
            this.loading=true
            request({
                url: url,
                method:"get",
                params:{
                    kw:kw,
                }
            }).then(res => {
                if(append){
                    this.blog_list.push(...res.data.results)
                }else{
                    this.blog_list = res.data.results
                }
                this.next = res.data.next
                if(res.data.next != null){
                    this.get_blog(res.data.next, type, kw, true)
                }
                if(type == 'search'){
                    this.bus.$emit("ChangeBreadcrumb",[kw+' 相关的文章'])
                }else{
                    this.bus.$emit("ChangeBreadcrumb",[type])
                }
                this.nothing = this.blog_list==0
                this.loading = false
                // console.log(res)
            }).catch(err => {
                console.log("category error")
                console.dir(err)
            })
        },
    },
    mounted(){
        // var self = this
        // window.onscroll = function(){
        //     //变量scrollTop是滚动条滚动时，距离顶部的距离
        //     var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //     //变量windowHeight是可视区的高度
        //     var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //     //变量scrollHeight是滚动条的总高度
        //     var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //     //滚动条到底部的条件
        //     if(scrollTop+windowHeight==scrollHeight){
        //         //写后台加载数据的函数
        //         if(self.next != null){
        //             var type = self.$route.params.type
        //             var kw= self.$route.query.kw
        //             self.get_blog(self.next, type, kw, true)
        //         }
        //     }
        // }
    },
    activated(){
        var type = this.$route.params.type
        var kw= this.$route.query.kw
        this.get_blog("/api/blog_list/"+type+"/", type, kw, false)
    },
    beforeRouteUpdate(to,from,next){
        var type = to.params.type
        var kw = to.query.kw
        this.get_blog("/api/blog_list/"+type+"/", type, kw, false)
        next()
    }
}
</script>
