<template>
    <div id="column">
        <div class="column">
            <h3 class="title-sidebar"><i class="layui-icon"></i> 栏目分类</h3>
            <ul class="layui-row layui-col-space5">
                <li class="layui-col-md12 layui-col-xs6" v-for="type in types" :key="type.id">
                    <router-link :to="{name:'category',params:{type:url_dict[type.name]}}" replace>
                    <i class="layui-icon"></i> {{type.name}}<span class="layui-badge layui-bg-gray" v-text="type.num"></span>
                    </router-link>
                </li>
            </ul>
        </div><!--column-->
    </div>
</template>

<script>
import {request} from '../../network/index'
import axios from 'axios'
export default {
    name: "column",
    data(){
        return {
            types:[],
            url_dict:{},
        }
    },
    mounted(){
        axios.all([
            request({
                url:"/api/blog_type/",
                method:"get"
            }),
            request({
                url:"/api/column_url/",
                method:"get",
            })
        ])
        .then( results => {
            this.types = results[0].data
            this.url_dict = results[1].data
            // console.log(results)
            // console.log(this.types)
        }).catch( err => {
            console.log("column error")
            console.log(err)
        })
    },
}
</script>