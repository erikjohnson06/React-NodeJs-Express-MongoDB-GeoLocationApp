"use strict";(self.webpackChunkGeoLocation_Sharing_App=self.webpackChunkGeoLocation_Sharing_App||[]).push([[516],{4581:function(e,t,n){n.r(t);var i=n(4165),a=n(5861),r=n(9439),l=n(2791),s=n(7689),u=n(3999),o=n(7212),c=n(2810),d=n(5434),p=n(9895),v=n(1595),f=n(7993),h=n(9508),m=n(3108),x=(n(7308),n(184));t.default=function(e){var t=(0,l.useContext)(m.V),n=(0,h.x)(),g=n.isLoading,Z=n.hasError,y=n.sendRequest,T=n.clearError,V=(0,f.c)({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1),j=(0,r.Z)(V,2),C=j[0],I=j[1],A=(0,s.s0)(),b=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(n){var a;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,(a=new FormData).append("title",C.inputs.title.value),a.append("description",C.inputs.description.value),a.append("address",C.inputs.address.value),a.append("image",C.inputs.image.value),e.next=9,y("http://localhost:5000/api/locations","POST",a,{Authorization:"Bearer "+t.token});case 9:A("/"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}();return(0,x.jsxs)(l.Fragment,{children:[(0,x.jsx)(d.Z,{error:Z,onClear:T}),(0,x.jsxs)("form",{className:"location-form",onSubmit:b,children:[g&&(0,x.jsx)(p.Z,{asOverlay:!0}),(0,x.jsx)(c.Z,{id:"title",element:"input",type:"text",label:"Title",validators:[(0,v.hg)()],errorText:"Please enter a valid title",onInput:I}),(0,x.jsx)(c.Z,{id:"description",element:"textarea",label:"Description",validators:[(0,v.CP)(5)],errorText:"Please enter a valid description (minimum of 5 characters)",onInput:I}),(0,x.jsx)(c.Z,{id:"address",element:"input",label:"Address",validators:[(0,v.hg)()],errorText:"Please enter a valid address",onInput:I}),(0,x.jsx)(o.Z,{id:"image",center:!0,onInput:I,errorText:"Please provide an image",buttonText:"Upload Image"}),(0,x.jsx)(u.Z,{type:"submit",disabled:!C.isValid,children:"Add Location"})]})]})}},7212:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(9439),a=n(2791),r=n(3999),l=n(184),s=function(e){var t=(0,a.useState)(),n=(0,i.Z)(t,2),s=n[0],u=n[1],o=(0,a.useState)(),c=(0,i.Z)(o,2),d=c[0],p=c[1],v=(0,a.useState)(!1),f=(0,i.Z)(v,2),h=f[0],m=f[1],x=(0,a.useRef)();(0,a.useEffect)((function(){if(s){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(s)}}),[s]);return(0,l.jsxs)("div",{className:"form-control",children:[(0,l.jsx)("input",{id:e.id,ref:x,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(t){var n,i=h;t.target.files||1===t.target.files.length?(n=t.target.files[0],u(n),m(!0),i=!0):(m(!1),i=!1),e.onInput(e.id,n,i)}}),(0,l.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[(0,l.jsx)("div",{className:"image-upload__preview",children:d&&(0,l.jsx)("img",{src:d,alt:"Preview"})}),(0,l.jsx)(r.Z,{type:"button",onClick:function(){x.current.click()},children:e.buttonText})]})]})}},2810:function(e,t,n){n.d(t,{Z:function(){return o}});var i=n(9439),a=n(1413),r=n(2791),l=n(1595),s=n(184),u=function(e,t){switch(t.type){case"CHANGE":return(0,a.Z)((0,a.Z)({},e),{},{value:t.val,isValid:(0,l.Gu)(t.val,t.validators)});case"TOUCH":return(0,a.Z)((0,a.Z)({},e),{},{isTouched:!0});default:return e}},o=function(e){var t=(0,r.useReducer)(u,{value:e.initialValue||"",isValid:e.initialValid||!1,isTouched:!1}),n=(0,i.Z)(t,2),a=n[0],l=n[1],o=e.id,c=e.onInput,d=a.value,p=a.isValid;(0,r.useEffect)((function(){c(o,d,p)}),[o,d,p,c]);var v=function(t){l({type:"CHANGE",val:t.target.value,validators:e.validators})},f=function(){l({type:"TOUCH"})},h="input"===e.element?(0,s.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:v,onBlur:f,value:a.value}):(0,s.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:v,onBlur:f,value:a.value});return(0,s.jsxs)("div",{className:"form-control ".concat(!a.isValid&&a.isTouched&&"form-control--invalid"),children:[(0,s.jsx)("label",{htmlFor:e.id,children:e.label}),h,!a.isValid&&a.isTouched&&(0,s.jsx)("p",{children:e.errorText})]})}},7993:function(e,t,n){n.d(t,{c:function(){return u}});var i=n(9439),a=n(4942),r=n(1413),l=n(2791),s=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var i in e.inputs)e.inputs[i]&&(n=i===t.inputId?n&&t.isValid:n&&e.inputs[i].isValid);return(0,r.Z)((0,r.Z)({},e),{},{inputs:(0,r.Z)((0,r.Z)({},e.inputs),{},(0,a.Z)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},u=function(e,t){var n=(0,l.useReducer)(s,{inputs:e,isValid:t}),a=(0,i.Z)(n,2),r=a[0],u=a[1];return[r,(0,l.useCallback)((function(e,t,n){u({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),(0,l.useCallback)((function(e,t){u({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},1595:function(e,t,n){n.d(t,{CP:function(){return o},Gu:function(){return d},Ox:function(){return c},hg:function(){return u}});var i=n(7762),a="REQUIRE",r="MINLENGTH",l="MAXLENGTH",s="EMAIL",u=function(){return{type:a}},o=function(e){return{type:r,val:e}},c=function(){return{type:s}},d=function(e,t){var n,u=!0,o=(0,i.Z)(t);try{for(o.s();!(n=o.n()).done;){var c=n.value;c.type===a&&(u=u&&e.trim().length>0),c.type===r&&(u=u&&e.trim().length>=c.val),c.type===l&&(u=u&&e.trim().length<=c.val),"MIN"===c.type&&(u=u&&+e>=c.val),"MAX"===c.type&&(u=u&&+e<=c.val),c.type===s&&(u=u&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){o.e(d)}finally{o.f()}return u}},7308:function(){}}]);
//# sourceMappingURL=516.63c445d4.chunk.js.map