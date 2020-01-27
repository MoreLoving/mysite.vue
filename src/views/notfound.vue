<template>
    <div id="notfound">
        <div id="page-wrapper">    
            <div class="page-blank-wrap">
                <div class="site-error">
                    <h1 class="headline"><img src="https://www.echo.so/usr/themes/echo/img/404.png" alt="404"></h1>
                    <div class="error-content">
                        <h4>海面雾气太大</h4><h4>受天气影响，该页无法正常显示</h4>
                        <h5> 你可以 <router-link to='/'>返回首页</router-link> 。</h5>
                    </div>
                    <img src="https://www.echo.so/usr/themes/echo/img/error-bg.png" style="padding:20px 0 120px;">
                </div>
            </div> 	   
        </div>
    </div>
</template>

<script>
export default {
    name: "notfound"
}
</script>

<style scoped>
        @import '../../public/static/css/404.css';
</style>