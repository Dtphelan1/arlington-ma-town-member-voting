(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{28:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(9),s=n.n(c),i=(n(28),n(11)),o=n(3),l=n(2);var j=function(e){var t=e.routes;return Object(l.jsx)("header",{children:Object(l.jsx)("nav",{className:"nav",children:t.map((function(e){return Object(l.jsx)(i.b,{exact:e.exact,className:"nav-link",activeClassName:"active",to:e.path,children:e.name},e.name)}))})})},u=n(18),d=n.n(u),b=n(22),h=n(49),x=n(23);var p=function(){return Object(l.jsx)("div",{className:"spinner-border",role:"status",children:Object(l.jsx)("span",{className:"sr-only",children:"Loading..."})})};var v=function(){return Object(l.jsxs)("div",{className:"alert alert-danger",role:"alert",children:[Object(l.jsx)("strong",{children:"Sorry!"})," Unable to load data. Try again momentarily."]})};var O=function(){return Object(l.jsx)("div",{className:"spinner-border",role:"status",children:Object(l.jsx)("span",{className:"sr-only",children:"Loading..."})})};var m=[{name:"Home Page",path:"/",exact:!0,component:function(){var e="http://example.com/api/v1/",t=Object(h.a)(Object(b.a)(d.a.mark((function t(){var n,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e);case 2:return n=t.sent,t.next=5,n.text();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)}))),[e]);return Object(l.jsxs)("section",{id:"main",children:[Object(l.jsx)("h1",{children:"Arlington 2020 Town Meeting Voting Results"}),Object(l.jsx)("p",{children:"See how your representatives voted on 2020 Arlington Articles"}),Object(l.jsx)(x.a,{options:[{value:1,label:"Precinct 1"},{value:2,label:"Precinct 2"},{value:3,label:"Precinct 3"}]}),t.loading?Object(l.jsx)(p,{}):t.error?Object(l.jsx)(v,{}):Object(l.jsx)(O,{data:t.value})]})}},{name:"FAQ Page",path:"/faq",component:function(){return Object(l.jsx)("section",{children:Object(l.jsx)("h1",{children:"FAQ Page would go here"})})}}];var f=function(){return Object(l.jsxs)(i.a,{children:[Object(l.jsx)(j,{routes:m}),Object(l.jsx)(o.c,{children:m.map((function(e){return Object(l.jsx)(o.a,{exact:e.exact,path:e.path,children:Object(l.jsx)(e.component,{})},e.path)}))})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};n(46);s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(f,{})}),document.getElementById("root")),g()}},[[47,1,2]]]);
//# sourceMappingURL=main.b2ab4837.chunk.js.map