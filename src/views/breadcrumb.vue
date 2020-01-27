<template>
    <div id="braedcrumb">
        <div class="map">
            <span class="layui-breadcrumb" style="visibility: visible;">
                <router-link to='/'>首页</router-link>
                <span v-for="(bread,index) in bread_list" :key="index">
                    <span lay-separator="">/</span>
                    <cite v-text="bread"></cite>
                </span>
                
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "breadcrumb",
    data(){
        return {
            bread_list:[],
        }
    },
    mounted(){
        let self = this
        this.bus.$on("ChangeBreadcrumb",function(list){
            self.bread_list = list
            // console.log(list)
        })
    }
}
</script>