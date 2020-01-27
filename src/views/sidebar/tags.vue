<template>
    <div id="tags">
        <div class="tags">
            <h3 class="title-sidebar"><i class="layui-icon"></i>标签云</h3>
            <div>
                <a class="layui-btn layui-btn-xs layui-btn-primary" :style="getRandomColor()" href="#" :title="tag.name" v-for="tag in tag_list" :key="tag.pk" v-text="tag.name"></a>
            </div>
        </div><!--tags-->
    </div>
</template>

<script>
import {request} from '../../network/index'
export default {
    name: "tags",
    data(){
        return{
            tag_list:[]
        }
    },
    methods:{
        getRandomColor(){
            return "color :rgb("+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
        }
    },
    mounted(){
        let self = this
        request({
            url:"/api/tag/",
            method:"get",
        }).then( res => {
            // console.log(res)
            self.tag_list = res.data
        }).catch( err => {
            console.log("tag error")
            console.dir(err)
        })
    }
}
</script>