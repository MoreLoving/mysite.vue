(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dynamic"],{"14ef":function(t,i,a){"use strict";a.r(i);var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"dynamic"},[a("div",{staticClass:"about-life"},[a("div",{staticClass:"t-w"},[a("div",{staticClass:"t-u"},[a("img",{attrs:{height:"120",src:t.imageBaseUrl+"/static/img/logo.png"}})]),a("div",{staticClass:"t-t"},[t._m(0),t._m(1),a("div",{staticClass:"t-i"},[a("router-link",{staticClass:"layui-btn layui-btn-radius layui-btn-sm",attrs:{to:"message"}},[t._v(" 留言")])],1)])])]),a("div",{staticClass:"title-life"},[t._m(2),a("span",[t._v(" "+t._s(t.dynamic_list.length)+" 条动态")])]),a("div",{staticClass:"mylife"},[a("br"),a("ol",{staticClass:"comment-list"},[a("ol",{staticClass:"comment-list"},t._l(t.dynamic_list,(function(i){return a("div",{key:i.pk,staticClass:"t-list comment-parent comment-odd comment-by-author",attrs:{id:"comment-comment-312"}},[a("div",{staticClass:"t-p"},[a("img",{staticClass:"avatar",attrs:{src:t.imageBaseUrl+"/static/img/touxiang.jpg",alt:"Joker",width:"40",height:"40"}})]),a("div",{staticClass:"t-r"},[a("strong",[a("router-link",{attrs:{to:"index",rel:"external nofollow"}},[t._v("Joker")])],1),a("p"),a("p",{domProps:{textContent:t._s(i.content)}}),a("p"),a("span",[t._v(t._s(t._f("dateTimeFormat")(i.time)))])])])})),0)])])])},n=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("h1",[t._v("Joker"),a("span",[a("i",{staticClass:"layui-icon"},[t._v("")]),t._v("苦逼码农一枚")])])},function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"t-d layui-hide-xs"},[a("span",{staticClass:"typed"},[a("p",[t._v("Feeling gratitude and not expressing it is like wrapping a present and not giving it."),a("br"),t._v("心存感谢但不表达，如同裹起礼物但不送出去。---- William Arthur Ward")])]),a("span",{staticClass:"typed-cursor",staticStyle:{"animation-iteration-count":"infinite"}},[t._v("|")])])},function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("h3",[a("i",{staticClass:"layui-icon"},[t._v("")]),t._v(" 我的动态")])}],e=a("1ae0"),c=a("d019"),l=a.n(c),r={name:"dynamic",data:function(){return{imageBaseUrl:l.a.imageBaseUrl,dynamic_list:[]}},mounted:function(){var t=this;Object(e["a"])({url:"/api/dynamic/",method:"get"}).then((function(i){t.dynamic_list=i.data,t.dynamic_num=i.data.length,console.log(t.dynamic_list)})).catch((function(t){console.log("dynamic error"),console.dir(t)}))},activated:function(){this.bus.$emit("ChangeActive","dynamic"),this.bus.$emit("ChangeBreadcrumb",["我的动态"])}},o=r,m=a("2877"),d=Object(m["a"])(o,s,n,!1,null,null,null);i["default"]=d.exports}}]);
//# sourceMappingURL=dynamic.f14f9541.js.map