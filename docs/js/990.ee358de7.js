"use strict";(self["webpackChunk_ourchitecture_bit_chomping"]=self["webpackChunk_ourchitecture_bit_chomping"]||[]).push([[990],{990:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return o}});var r=n(587),i=n(545),c=n(515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const o=(t,e,n,o,s)=>{const u=t.ownerDocument.defaultView,a=(0,i.i)(t),h=t=>{const e=50,{startX:n}=t;return a?n>=u.innerWidth-e:n<=e},l=t=>a?-t.deltaX:t.deltaX,d=t=>a?-t.velocityX:t.velocityX,p=t=>h(t)&&e(),b=t=>{const e=l(t),n=e/u.innerWidth;o(n)},f=t=>{const e=l(t),n=u.innerWidth,i=e/n,c=d(t),o=n/2,a=c>=0&&(c>.2||e>o),h=a?1-i:i,p=h*n;let b=0;if(p>5){const t=p/Math.abs(c);b=Math.min(t,540)}s(a,i<=0?.01:(0,r.j)(0,i,.9999),b)};return(0,c.A)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:p,onStart:n,onMove:b,onEnd:f})}}}]);
//# sourceMappingURL=990.ee358de7.js.map