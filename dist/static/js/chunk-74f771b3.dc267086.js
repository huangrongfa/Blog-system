(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74f771b3"],{"3dbf":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"content-block"},[o("div",{staticClass:"jumbtion"},[o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"留言名称"}},[o("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"留言类型"}},[o("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[o("el-option",{attrs:{label:"国内",value:"1"}}),o("el-option",{attrs:{label:"国际",value:"2"}})],1)],1),o("el-form-item",{attrs:{label:"留言时间"}},[o("el-col",[o("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期",format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd"},model:{value:e.form.date1,callback:function(t){e.$set(e.form,"date1",t)},expression:"form.date1"}})],1)],1),o("el-form-item",{attrs:{label:"留言内容"}},[o("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.onSubmit()}}},[e._v("提交留言")])],1)],1)],1)])},n=[],r=(o("b0c0"),o("fd03")),l={data:function(){return{form:{name:"",region:"",date1:"",type:[],resource:"",desc:""}}},created:function(){},mounted:function(){},components:{},methods:{onSubmit:function(){var e=this;if(window.localStorage.getItem("token")){if(""==this.form.name||""==this.form.desc||""==this.form.date1)return!1;Object(r["b"])({id:"0002",title:this.form.name,content:this.form.desc}).then((function(t){200===t.status&&e.$message({message:"提交成功",type:"success"})}))}else this.$alert("抱歉，您还没有登录",{confirmButtonText:"确定",callback:function(t){e.$message({type:"info"})}})}}},s=l,c=(o("6cdc"),o("2877")),i=Object(c["a"])(s,a,n,!1,null,"0c6607cc",null);t["default"]=i.exports},"6cdc":function(e,t,o){"use strict";var a=o("f122"),n=o.n(a);n.a},f122:function(e,t,o){}}]);