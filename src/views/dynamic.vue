<template>
    <div class="dynamic">
        <div class="about-life">
            <div class="t-w">
                <div class="t-u"><img height="120" :src="imageBaseUrl+'/static/img/logo.png'"></div>
                <div class="t-t">
                    <h1>Joker<span><i class="layui-icon"></i>苦逼码农一枚</span></h1>
                    <!-- <div class="t-d layui-hide-sm">
                        <p>心存感谢但不表达，如同裹起礼物但不送出去。</p>
                    </div> -->
                    <div class="t-d layui-hide-xs">
                        <span class="typed"><p>Feeling gratitude and not expressing it is like wrapping a present and not giving it.<br>心存感谢但不表达，如同裹起礼物但不送出去。---- William Arthur Ward</p></span><span class="typed-cursor" style="animation-iteration-count: infinite;">|</span>
                    </div>
                    <div class="t-i">
                        <!-- <a class="layui-btn layui-btn-radius layui-btn-sm" href="#"> 关于我</a> -->
                        <router-link to='message' class="layui-btn layui-btn-radius layui-btn-sm"> 留言</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-life">
            <h3><i class="layui-icon"></i> 我的动态</h3>
            <span> {{dynamic_list.length}} 条动态</span>
        </div>
        <div class="mylife">
            <br>
            <ol class="comment-list">
                <ol class="comment-list">
                    <div id="comment-comment-312" class="t-list comment-parent comment-odd comment-by-author" v-for="dynamic in dynamic_list" :key="dynamic.pk">
                        <div class="t-p"><img class="avatar" :src="imageBaseUrl+'/static/img/touxiang.jpg'" alt="Joker" width="40" height="40"></div>
                        <div class="t-r">
                            <strong><router-link to="index" rel="external nofollow">Joker</router-link></strong>
                            <p></p><p v-text="dynamic.content"></p><p></p>
                            <span>{{dynamic.time|dateTimeFormat}}</span>
                        </div>
                    </div>

                </ol>              
            </ol>
        </div> 
    </div>
</template>
<script>
import {request} from '../network/index'
import config from '../network/config'
export default {
    name: "dynamic",
    data(){
        return{
            imageBaseUrl:config.imageBaseUrl,
            dynamic_list:[],
        }
    },
    mounted(){
        let self = this
        request({
            url:"/api/dynamic/",
            method:"get",
        }).then( res => {
            self.dynamic_list = res.data
            self.dynamic_num = res.data.length
            console.log(self.dynamic_list)
        }).catch( err => {
            console.log("dynamic error")
            console.dir(err)
        })
    },
    activated(){
        this.bus.$emit("ChangeActive", "dynamic")
        this.bus.$emit("ChangeBreadcrumb",["我的动态"])

    }
}
</script>