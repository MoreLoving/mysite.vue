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
        <div class="comment-text layui-form">
            <div id="comments">
                <div id="respond-page-14" class="respond">
                    <div class="cancel-comment-reply">
                        <a id="cancel-comment-reply-link" href="#" rel="nofollow" style="display: none;" >取消回复</a>          
                    </div>
                    <h4 id="response"><i class="layui-icon"></i> 评论啦~</h4>
                    <br>
                    <form method="post" id="comment-form" role="form">
                        <div class="layui-form-item">
                            <textarea rows="5" cols="30" name="text" id="textarea" placeholder="嘿~ 大神，别默默的看了，快来点评一下吧" class="layui-textarea" required="" v-model="comment.content"></textarea>
                        </div>
                        <div class="layui-form-item layui-row layui-col-space5">
                            <div class="layui-col-md4">
                                <input type="text" name="author" id="author" class="layui-input" placeholder="* 怎么称呼" v-model="comment.name" required="">
                            </div>
                            <div class="layui-col-md4">
                                <input type="email" name="mail" id="mail" lay-verify="email" class="layui-input" placeholder="* 邮箱(放心~会保密~.~)" v-model="comment.email" required="">
                            </div>
                            <div class="layui-col-md4">
                                <input type="url" name="url" id="url" lay-verify="url" class="layui-input" placeholder="http://您的主页" v-model="comment.website">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <button  class="layui-btn layui-btn-normal" @click.prevent="post()">提交评论</button>
                        </div>
                        <input type="hidden" name="_" value="b4e59c207cd06785ae2323dacb00bfb5">
                    </form>
                </div>
                <div id="comment-form-place-holder"></div>
                <br>
                <h3 v-cloak>已有 {{blog.comments.length}} 条评论</h3>
                <br>
                <div class="pinglun">
                    <ol class="comment-list">
                        <li  class="comment-body comment-parent comment-odd" v-for="comment in blog.comments" :key="comment.pk">
                            <div  class="pl-dan comment-txt-box">
                                <div class="t-p comment-author">
                                    <img class="avatar" src="static/img/commenter.jpeg" alt="wyzblog" width="40" height="40">        </div>
                                <div class="t-u comment-author">
                                    <strong>
                                        <a :href="comment.website" rel="external nofollow" v-text="comment.name"></a>                <span class="layui-badge"></span>
                                    </strong>
                                    <div><b></b></div>
                                    <div class="t-s"><p></p><p v-text="comment.content"></p><p></p></div>
                                    <span class="t-btn"><a href="" rel="nofollow" onclick="return TypechoComment.reply('comment-535', 535);">回复</a> <span class="t-g" v-cloak>{{comment.time|dateTimeFormat}}</span></span> 
                                </div><!-- 单条评论者信息及内容 -->
                            </div>
                        </li>
                    </ol> 
                </div>
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
            blog:{
                'comments':[],
            },
            hasPrevious:false,
            hasNext:false,
            comment:{
                'content':'',
                'name':'',
                'email':'',
                'website':'',
            }
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
                this.comment.blog_id = this.blog.id
                // 面包屑
                this.bus.$emit("ChangeBreadcrumb",[this.blog.type,'正文'])
                // console.dir(res)
            }).catch( err => {
                console.log("blog error")
                console.log(err)
            })
        },
        post(){
            if(!this.comment.content || !this.comment.name || !this.comment.email || !this.comment.website){
                window.layui.layer.alert('所有表单都不能为空!',{icon:2});
                return false
            }
            var emailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
            if (!emailReg.test(this.comment.email)) {
                window.layui.layer.alert('邮箱格式不正确！',{icon:2});
                return false
            } 
            var urlReg = /^(https|http):\/\//;
            if (!urlReg.test(this.comment.website)) {
                window.layui.layer.alert('网站格式不正确！',{icon:2});
                return false
            }
            var load = window.layui.layer.load(2);
            request({
                url:"/api/comment/",
                method:"post",
                data:this.comment,
            }).then( res => {
                window.layui.layer.alert('评论成功!',{icon:1},() => {
                    location.reload()
                })
                console.log(res)
            }).catch( err => {
                console.log('message error')
                console.dir(err)
            })
            window.layui.layer.close(load)
            // console.log(this.comment)
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