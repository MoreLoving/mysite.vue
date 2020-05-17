<template>
    <div id="search">
        <div class="component">
              <form class="layui-form" id="search" method="post" action="#" role="search">
                <div class="layui-inline input">
                    <input type="text" id="s" name="s" class="layui-input" required="" lay-verify="required" placeholder="输入关键字搜索" v-model="keyword">
                </div>
                &nbsp;
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-sm layui-btn-primary" @click.prevent="search()"><i class="layui-icon"></i></button>
                </div>
            </form>
        </div><!--component-->
    </div>
</template>

<script>
export default {
    name: "search",
    data(){
        return{
            keyword:'',
        }
    },
    methods:{
        search(){
            var kw = this.keyword
            this.keyword = ''
            this.$router.push({name:'category',params:{type:'search'},query:{kw:kw}}).catch(err => {err})
        }
    }
}
</script>