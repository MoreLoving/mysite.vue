<template>
    <div id="archives">
        <div class="archives">
            <div class="title-page">
                <h3><i class="layui-icon"></i> 文章归档</h3>
                <p>目前共计 <em v-text="all_blogs"></em> 篇日志，共 <em v-text="all_comments"></em> 条评论，加油啊~</p>
            </div>
            <ul class="layui-timeline">
                <li class="layui-timeline-item" v-for="(archive,index) in archives" :key="index">
                    <i class="layui-icon layui-timeline-axis"></i>
                    <div class="layui-timeline-content">
                        <h3 class="layui-timeline-title"><a href="#">{{archive.y}}年 {{archive.m}}月 </a></h3>
                        <p v-for="blog in archive.blogs" :key=blog.id><router-link :to="{name:'blog',params:{id:blog.id}}"  :title="blog.title">{{blog.title}}<small><i class="layui-icon"></i> {{blog.day}}日发布，共{{blog.comments}}条评论</small></router-link></p>
                    </div>
                </li>
                <li class="layui-timeline-item">
                    <i class="layui-icon layui-timeline-axis"></i>
                    <div class="layui-timeline-content layui-text">
                        <div class="layui-timeline-title">开始</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {request} from '../network/index'
export default {
    name: "archives",
    activated(){
        this.bus.$emit("ChangeActive","archives")
        this.bus.$emit("ChangeBreadcrumb",["所有文章"])
    },
    data(){
        return {
            time_line:{},
            archives:[],  
            all_blogs:0,
            all_comments:0,     
        }
    }
    ,
    methods:{
        getDate(timestr){
            var time = new Date(timestr)
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            return {y,m,d}
        },
        timeAdd0(str) {
            if (str < 10) {
                str = '0' + str;
            }
            return str
        },
    }
    ,
    mounted(){
        let self = this
        var ymd
        request({
            url:"/api/archives/",
            method:"get",
        }).then( res => {
            //将所有blog根据年月映射
            res.data.forEach(element => {
                ymd = self.getDate(element.created_time);
                element.day = ymd.d

                var dateStr = ymd.y + '' +self.timeAdd0(ymd.m)
                if(dateStr in self.time_line){
                    self.time_line[dateStr].blogs.push(element)
                }else{
                    self.time_line[dateStr] = {
                        'y':ymd.y,
                        'm':self.timeAdd0(ymd.m),
                        'blogs':[element],
                        'sortby':element.id,
                    }
                }
                self.all_blogs ++
                self.all_comments += element.comments
            });
            //将映射变成数组
            for(let i in self.time_line){
                self.archives.push(self.time_line[i])
            }
            //数组按时间倒序排序
            self.archives.sort((a,b) => {
                return b.sortby - a.sortby
            })
            // console.log(self.time_line)
            // console.log(self.archives)

        }).catch( err => {
            console.log("archives error")
            console.log(err)
        })
    }
}
</script>