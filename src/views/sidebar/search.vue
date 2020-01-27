<template>
    <div id="search">
        <div class="component">
              <form class="layui-form" id="search" method="post" action="#" role="search">
                <div class="layui-inline input">
                    <input type="text" id="s" name="s" class="layui-input" required="" lay-verify="required" placeholder="输入关键字搜索">
                </div>
                &nbsp;
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-sm layui-btn-primary"><i class="layui-icon"></i></button>
                </div>
            </form>
        </div><!--component-->
    </div>
</template>

<script>
export default {
    name: "search",

}
</script>