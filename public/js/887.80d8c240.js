"use strict";(self["webpackChunkdev_yelp"]=self["webpackChunkdev_yelp"]||[]).push([[887],{2887:function(e,t,r){r.r(t),r.d(t,{default:function(){return b}});var s=r(6190),a=r(266),i=r(9256),d=r(5125),o=r(1713),n=r(7808),l=function(){var e=this,t=e._self._c;return t(d.Z,{ref:"form",model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[t(i.Z,[t("h2",[e._v(" "+e._s("CreateCompany"==this.$route.name?"Create":"Update")+" Company ")]),t(o.Z,[t(a.Z,{attrs:{cols:"12",md:"6"}},[t(n.Z,{attrs:{label:"Name",rules:e.requiredString,required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),t(a.Z,{attrs:{cols:"12",md:"6"}},[t(n.Z,{attrs:{rules:e.requiredString,label:"Address",required:""},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1),t(a.Z,{attrs:{cols:"12",md:"12"}},[t(n.Z,{attrs:{rules:e.requiredString,label:"Description",required:""},model:{value:e.desc,callback:function(t){e.desc=t},expression:"desc"}})],1),t(a.Z,{attrs:{cols:"12",md:"4"}},[t(s.Z,{staticClass:"mr-4",attrs:{disabled:!e.form,color:"success"},on:{click:this.submit}},[e._v(" Submit ")])],1)],1)],1)],1)},c=[],u=r(629),m={data(){return{form:"",requiredString:[e=>!!e||"Field is required",e=>e&&e.length>=5||"Field must be more than 5 characters"],name:"",desc:"",address:""}},created:async function(){if("UpdateCompany"==this.$route.name){let e=await fetch(`http://localhost:5000/api/v1/companies/${this.$route.params.id}`,{headers:{Authorization:`Bearer ${this.token}`}});e=await e.json(),e.data?(this.id=e.data.id,this.name=e.data.name,this.desc=e.data.desc,this.address=e.data.address):e.error&&(this.error=e.error)}},methods:{submit:async function(){let e=this.$route.params.id||"",t=e?"PUT":"POST",r=await fetch(`http://localhost:5000/api/v1/companies/${e}`,{method:t,headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify({name:this.name,address:this.address,desc:this.desc})});r=await r.json(),r.data?alert("Submitted Successfuly"):r.error&&(this.error=r.error),this.$router.push("/companies")}},computed:{...(0,u.Se)(["token"])}},h=m,p=r(3736),f=(0,p.Z)(h,l,c,!1,null,null,null),b=f.exports}}]);
//# sourceMappingURL=887.80d8c240.js.map