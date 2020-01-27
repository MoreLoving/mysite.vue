<template>
    <div id="blog">
        <div class="title-article">
            <h1 v-text="blog.title"></h1>
            <div class="title-msg">
                <span><i class="layui-icon"></i> Joker</span>
                <span v-cloak><i class="layui-icon"></i> {{blog.created_time|dateTimeFormat2}} </span>
                <span v-cloak><i class="layui-icon"></i> {{blog.view_num}}℃</span>
                <span v-cloak><i class="layui-icon"></i> {{blog.comment_num}}条</span>
            </div>
        </div>
        <div class="text" itemprop="articleBody" v-html="blog.content">
        </div>
        <div class="tags-text">
            <i class="layui-icon"></i>标签: <a href="#" v-for="tag in blog.tags" :key="tag.id" v-text="tag.name+' '"></a>           
        </div>
        <div class="page-text">
            <div>
                <span class="layui-badge layui-bg-gray">上一篇</span>
                <router-link v-if="hasPrevious" :to="{name:'blog',params:{id:blog.previous_post.id}}" :title="blog.previous_post.title" v-text="blog.previous_post.title"></router-link>               
                <span v-else>没有了</span>                
            </div>
            <div>
                <span class="layui-badge layui-bg-gray">下一篇</span>
                <router-link v-if="hasNext" :to="{name:'blog',params:{id:blog.next_post.id}}" :title="blog.next_post.title" v-text="blog.next_post.title"></router-link>               
                <span v-else>没有了</span>                
            </div>
        </div>
    </div>
</template>

<script>
import {request} from "../network/index"
export default {
    name: "blog",
    data(){
        return {
            blog:{},
            hasPrevious:false,
            hasNext:false,
        }
    },
    methods:{
        getBlog(id){
            request({
                url:"/api/detail/"+id+"/",
                method:"get",
            }).then( res => {
                this.blog = res.data
                document.title = this.blog.title
                this.hasPrevious = this.blog.previous_post.id != undefined
                this.hasNext = this.blog.next_post.id != undefined
                // 面包屑
                this.bus.$emit("ChangeBreadcrumb",[this.blog.type,'正文'])
                // console.dir(res)
            }).catch( err => {
                console.log("blog error")
                console.log(err)
            })
        }
    }
    ,
    activated(){
        this.getBlog(this.$route.params.id)
    },
    mounted(){
        this.getBlog(this.$route.params.id)
    }
    ,
    beforeRouteUpdate(to,from,next){
        var load = this.layui.layer.load(1)
        this.getBlog(to.params.id)
        this.layui.layer.close(load)
        next()
    }

}
</script>