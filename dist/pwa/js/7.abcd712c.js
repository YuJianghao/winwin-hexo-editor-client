(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{8642:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"bg-primary fixed installer flex flex-center"},[s("div",{staticClass:"wrapper full-width q-px-lg column",staticStyle:{"max-width":"1200px"}},[s("q-banner",{staticClass:"bg-primary text-white"},[s("span",{staticClass:"text-h5"},[e._v(" winwin-hexo-editor ")])]),e.finished?s("div",{staticClass:"col bg-white q-pa-lg",attrs:{color:"primary",flat:""}},[s("q-markdown",{staticClass:"q-py-xl",attrs:{src:e.finishedmd}}),s("q-btn",{attrs:{stretch:"",color:"primary",label:"开始使用"},on:{click:e.onFinished}})],1):s("q-stepper",{ref:"stepper",staticClass:"col",attrs:{color:"primary","header-nav":"",animated:"",flat:"",contracted:e.$q.screen.lt.sm},scopedSlots:e._u([{key:"navigation",fn:function(){return[s("q-stepper-navigation",[s("q-btn",{attrs:{stretch:"",color:"primary",label:5===e.step?"完成":"下一步",disable:5===e.step&&!e.isAllValid},on:{click:function(t){5===e.step?e.doInstall():e.$refs.stepper.next()}}}),e.step>1?s("q-btn",{staticClass:"q-ml-sm",attrs:{stretch:"",flat:"",color:"primary",label:"上一步"},on:{click:function(t){return e.$refs.stepper.previous()}}}):e._e()],1)]},proxy:!0},{key:"message",fn:function(){return[2===e.step?s("q-banner",{staticClass:"bg-blue text-white q-px-lg",scopedSlots:e._u([{key:"avatar",fn:function(){return[s("q-icon",{attrs:{name:"security",color:"white"}})]},proxy:!0}],null,!1,158030015)},[e._v("\n          为了安全考虑请使用和其他应用不同的密码！\n        ")]):5!==e.step||e.isAllValid?e._e():s("q-banner",{staticClass:"bg-red text-white q-px-lg",scopedSlots:e._u([{key:"avatar",fn:function(){return[s("q-icon",{attrs:{name:"warning",color:"white"}})]},proxy:!0}],null,!1,894313219)},[e._v("\n          检测到了一些问题，请更改后再试\n        ")])]},proxy:!0}],null,!1,4285124467),model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[s("q-step",{attrs:{name:1,title:"欢迎",icon:"flag",done:e.step>1}},[s("q-markdown",{staticClass:"q-py-xl",attrs:{src:e.welcomemd}})],1),s("q-step",{attrs:{name:2,title:"用户",icon:"person",error:!e.isValid(e.step2)&&e.step>2,done:e.step>2}},[s("div",{staticClass:"input-wrapper"},[e._l(e.step2,(function(t){return s("q-input",{key:t.key,staticClass:"stepper-input",attrs:{type:"text",label:t.label,rules:t.rules,"stack-label":"",filled:""},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}})})),s("q-markdown",{staticClass:"col",attrs:{src:e.usermd}})],2)]),s("q-step",{attrs:{name:3,title:"博客",icon:"book",error:!e.isValid(e.step3)&&e.step>3,done:e.step>2}},[s("div",{staticClass:"input-wrapper"},[e._l(e.step3,(function(t){return s("q-input",{key:t.key,staticClass:"stepper-input",attrs:{type:"text",label:t.label,rules:t.rules,"stack-label":"",filled:""},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}})})),s("q-markdown",{staticClass:"col",attrs:{src:e.hexomd}})],2)]),s("q-step",{attrs:{name:4,title:"安全",icon:"security"}},[s("div",{staticClass:"input-wrapper"},[e._l(e.step4,(function(t){return s("q-input",{key:t.key,staticClass:"stepper-input",attrs:{type:"text",label:t.label,rules:t.rules,"stack-label":"",filled:""},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}})})),s("q-markdown",{staticClass:"col",attrs:{src:e.securitymd}})],2)]),s("q-step",{attrs:{name:5,title:"确认",icon:"done"}},[e.isAllValid?[s("div",{staticClass:"input-wrapper"},[s("div",{staticClass:"text-h6 q-mb-lg"},[e._v("以下是你的设置")]),e._l(e.checkInfo,(function(t){return s("q-input",{key:t.key,staticClass:"stepper-input",attrs:{type:"text",label:t.label,"stack-label":"",filled:"",disable:""},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}})}))],2)]:[s("div",{staticClass:"q-py-xl text-red text-bold"},[s("q-icon",{staticClass:"q-mr-sm",attrs:{name:"close",size:"xx-large"}}),s("span",[e._v("表单验证失败")])],1)]],2)],1)],1)])},n=[],l=s("967e"),i=s.n(l),r=(s("96cf"),s("fa84")),o=s.n(r),c="# 欢迎使用\n\n在使用编辑器之前仍需要一些配置\n\n您可以查看[安装指南](https://winwin_2011.gitee.io/winwin-hexo-editor/guide/)和[FAQ](https://winwin_2011.gitee.io/winwin-hexo-editor/support/)获取更多帮助\n",u="# 恭喜！安装完成\n\n开始使用吧！\n\n在使用中有任何疑问可以到[支持页面](https://winwin_2011.gitee.io/winwin-hexo-editor/support)和[安装指南](https://winwin_2011.gitee.io/winwin-hexo-editor/guide/)寻找支持\n",p="用户名和密码用于登录编辑器，您可以稍后在设置中更改。为了安全考虑请**使用和其他应用不同的密码**！\n",d="此目录应该是你的hexo博客的路径，相对路径或者绝对路径均可，这应该是hexo的`config.yml`文件所在目录\n\n此项在完成安装后仍可以在设置中更改\n",f="以上两项是加密所用密钥，可选，但强烈建议更改为自己喜欢的随机值\n\n此项在完成安装后仍可以在设置中更改\n",m=s("3fa5"),h=s("b09d"),v=s("f508"),b={name:"Install",data:function(){return{finished:!1,finishedmd:u,welcomemd:c,usermd:p,hexomd:d,securitymd:f,step:1,validHexoRoot:!0,serverHexoRoot:"",step2:[{key:"username",label:"用户名（必填）",value:"",rules:[function(e){return!!e||"必填项"}]},{key:"password",label:"密码（必填）",value:"",rules:[function(e){return!!e||"必填项"}]}],step3:[{key:"HEXO_ROOT",label:"博客相对目录（必填）",value:"",rules:[function(e){return!!e||"必填项"}]}],step4:[{key:"JWT_SECRET",label:"JWT_SECRET",value:""},{key:"APIKEY_SECRET",label:"APIKEY_SECRET",value:""}]}},computed:{allConfig:function(){return this.step2.concat(this.step3).concat(this.step4)},checkInfo:function(){return this.allConfig.filter((function(e){return e.value}))},isAllValid:function(){return this.isValid(this.allConfig)}},methods:{isValid:function(e){return 0===e.filter((function(e){return e.rules&&e.rules.length})).filter((function(e){return!0!==e.rules[0](e.value)})).length},onFinished:function(){this.$router.push("/")},doInstall:function(){var e=this;return o()(i.a.mark((function t(){var s;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s={},e.allConfig.filter((function(e){return!!e.value})).map((function(e){s[e.key]=e.value})),t.prev=2,v["a"].show({message:"正在安装"}),t.next=6,e.$apis.install.do(s);case 6:v["a"].hide(),e.finished=!0,t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](2),v["a"].hide(),t.t0.response&&400===t.t0.response.status?t.t0.response.data.data.path&&(e.serverHexoRoot=t.t0.response.data.data.path,h["a"].create(h["b"].ConfirmDialog,{title:"安装尝试失败",message:"请更改HEXO_ROOT\n".concat(e.serverHexoRoot,"不是有效的hexo博客"),okLabel:"确定"})):m["a"].error({message:"安装尝试失败",caption:t.t0.message});case 14:case"end":return t.stop()}}),t,null,[[2,10]])})))()}}},x=b,w=(s("9c55"),s("2877")),k=s("eebe"),y=s.n(k),q=s("54e1"),g=s("f531"),C=s("87fe"),_=s("27f9"),E=s("0016"),S=s("b19c"),R=s("9c40"),$=Object(w["a"])(x,a,n,!1,null,"f90085c0",null);t["default"]=$.exports;y()($,"components",{QBanner:q["a"],QStepper:g["a"],QStep:C["a"],QInput:_["a"],QIcon:E["a"],QStepperNavigation:S["a"],QBtn:R["a"]})},"9c55":function(e,t,s){"use strict";var a=s("eeba"),n=s.n(a);n.a},eeba:function(e,t,s){}}]);