"use strict";(self.webpackChunkGeoLocation_Sharing_App=self.webpackChunkGeoLocation_Sharing_App||[]).push([[967],{3373:function(e,n,s){s.d(n,{Z:function(){return a}});s(2791);var t=s(184),a=function(e){return(0,t.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},3723:function(e,n,s){s.r(n),s.d(n,{default:function(){return j}});var t=s(4165),a=s(5861),r=s(9439),c=s(2791),i=s(1087),o=s(184),l=function(e){return(0,o.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:(0,o.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})},u=s(3373),h=function(e){return(0,o.jsx)("li",{className:"user-item",children:(0,o.jsx)(u.Z,{className:"user-item__content",children:(0,o.jsxs)(i.rU,{to:"/".concat(e.id,"/locations"),children:[(0,o.jsx)("div",{className:"user-item__image",children:(0,o.jsx)(l,{image:"".concat("http://localhost:5000","/uploads/images/").concat(e.image),alt:e.name})}),(0,o.jsxs)("div",{className:"user-item__info",children:[(0,o.jsx)("h2",{children:e.name}),(0,o.jsxs)("h3",{children:[e.locationCount," ",1===e.locationCount?"Location":"Locations"]})]})]})})})},d=function(e){return 0===e.items.length?(0,o.jsx)("div",{className:"center",children:(0,o.jsx)(u.Z,{children:(0,o.jsx)("h2",{children:"No users found."})})}):(0,o.jsx)("ul",{className:"users-list",children:e.items.map((function(e){return(0,o.jsx)(h,{id:e.id,image:e.image,name:e.name,locationCount:e.locations.length},e.id)}))})},m=s(5434),x=s(9895),f=s(9508),j=function(){var e=(0,f.x)(),n=e.isLoading,s=e.hasError,i=e.sendRequest,l=e.clearError,u=(0,c.useState)(),h=(0,r.Z)(u,2),j=h[0],p=h[1];return(0,c.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i("http://localhost:5000/api/users/");case 3:n=e.sent,p(n.users),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[i]),(0,o.jsxs)(c.Fragment,{children:[(0,o.jsx)(m.Z,{error:s,onClear:l}),n&&(0,o.jsx)("div",{className:"center",children:(0,o.jsx)(x.Z,{})}),!n&&j&&(0,o.jsx)(d,{items:j})]})}}}]);
//# sourceMappingURL=967.f7cb052d.chunk.js.map