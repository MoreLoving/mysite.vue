<template>
    <div id="dynamic">
        <div class="dynamic">
            <h3 class="title-sidebar"><i class="layui-icon"></i>博主动态 ~ </h3>
            <ul>
                <li v-for="dynamic in dynamic_list" :key="dynamic.pk">
                    <span class="layui-badge-dot layui-bg-gray"></span><p v-cloak>{{dynamic.content}}<small>{{ dynamic.time | dateTimeFormat3 }}</small></p>
                </li>
            </ul>
        </div><!--dynamic-->
    </div>
</template>

<script>
import {request} from '../../network/index'
export default {
    name: "dynamic",
    data(){
        return{
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
            // console.log(self.dynamic_list)
        }).catch( err => {
            console.log("sidebar dynamic error")
            console.dir(err)
        })
    }

}
</script>