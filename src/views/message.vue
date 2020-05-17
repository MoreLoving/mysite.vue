<template>
    <div id="message">
        <div class="title-article text-center">
            <h1>留言</h1>
        </div>
        <div class="text" itemprop="articleBody">
            <div id="md_content_2" class="md_content markdown-body editormd-html-preview" style="min-height: 50px;"><p>有什么想对我说的么？</p>
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
                <h3 v-cloak>已有 {{comment_list.length}} 条评论</h3>
                <br>
                <div class="pinglun">
                    <ol class="comment-list">
                        <li  class="comment-body comment-parent comment-odd" v-for="comment in comment_list" :key="comment.pk">
                            <div  class="pl-dan comment-txt-box">
                                <div class="t-p comment-author">
                                    <img class="avatar" src="static/img/commenter.jpeg" alt="wyzblog" width="40" height="40">        </div>
                                <div class="t-u comment-author">
                                    <strong>
                                        <a :href="comment.website" rel="external nofollow" v-text="comment.name"></a>                <span class="layui-badge"></span>
                                    </strong>
                                    <div><b></b></div>
                                    <div class="t-s"><p></p><p v-text="comment.content"></p><p></p></div>
                                    <span class="t-btn"> <span class="t-g" v-cloak>{{comment.time|dateTimeFormat}}</span></span> 
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
import {request} from '../network/index'
export default {
    name: "message",
    data(){
        return {
            comment_list:[],
            comment:{
                'blog_id':0,
                'name':'',
                'content':'',
                'website':'',
                'email':'',
            }
        }
    },
    mounted(){
        let self = this
        request({
            url:"/api/comment/",
            method:"get",
            params:{
                'blog_id':0,
            }
        }).then( res => {
            self.comment_list = res.data
            // console.log(res)
        }).catch( err => {
            console.log("message error")
            console.dir(err)
        })
    },
    activated(){
        this.bus.$emit("ChangeActive", "message")
        this.bus.$emit("ChangeBreadcrumb",["留言板"])
    },
    methods:{
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
}
</script>