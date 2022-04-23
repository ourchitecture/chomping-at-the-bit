"use strict";(self["webpackChunk_ourchitecture_bit_chomping"]=self["webpackChunk_ourchitecture_bit_chomping"]||[]).push([[775],{8775:function(e,t,n){n.r(t),n.d(t,{startInputShims:function(){return D}});var o=n(8487),r=n(6587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const i=new WeakMap,s=(e,t,n,o=0)=>{i.has(e)!==n&&(n?c(e,t,o):l(e,t))},a=e=>e===e.getRootNode().activeElement,c=(e,t,n)=>{const o=t.parentNode,r=t.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,o.appendChild(r),i.set(e,r);const s=e.ownerDocument,a="rtl"===s.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${a}px,${n}px,0) scale(0)`},l=(e,t)=>{const n=i.get(e);n&&(i.delete(e),n.remove()),e.style.pointerEvents="",t.style.transform=""},d=(e,t,n)=>{if(!n||!t)return()=>{};const o=n=>{a(t)&&s(e,t,n)},i=()=>s(e,t,!1),c=()=>o(!0),l=()=>o(!1);return(0,r.a)(n,"ionScrollStart",c),(0,r.a)(n,"ionScrollEnd",l),t.addEventListener("blur",i),()=>{(0,r.b)(n,"ionScrollStart",c),(0,r.b)(n,"ionScrollEnd",l),t.addEventListener("ionBlur",i)}},u="input, textarea, [no-blur], [contenteditable]",m=()=>{let e=!0,t=!1;const n=document,o=()=>{t=!0},i=()=>{e=!0},s=o=>{if(t)return void(t=!1);const r=n.activeElement;if(!r)return;if(r.matches(u))return;const i=o.target;i!==r&&(i.matches(u)||i.closest(u)||(e=!1,setTimeout((()=>{e||r.blur()}),50)))};return(0,r.a)(n,"ionScrollStart",o),n.addEventListener("focusin",i,!0),n.addEventListener("touchend",s,!1),()=>{(0,r.b)(n,"ionScrollStart",o,!0),n.removeEventListener("focusin",i,!0),n.removeEventListener("touchend",s,!1)}},f=.3,v=(e,t,n)=>{const o=e.closest("ion-item,[ion-item]")||e;return p(o.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)},p=(e,t,n,o)=>{const r=e.top,i=e.bottom,s=t.top,a=Math.min(t.bottom,o-n),c=s+15,l=.75*a,d=l-i,u=c-r,m=Math.round(d<0?-d:u>0?-u:0),v=Math.min(m,r-s),p=Math.abs(v),h=p/f,w=Math.min(400,Math.max(150,h));return{scrollAmount:v,scrollDuration:w,scrollPadding:n,inputSafeY:4-(r-c)}},h=(e,t,n,o,i)=>{let s;const c=e=>{s=(0,r.p)(e)},l=c=>{if(!s)return;const l=(0,r.p)(c);E(6,s,l)||a(t)||(c.stopPropagation(),w(e,t,n,o,i))};return e.addEventListener("touchstart",c,!0),e.addEventListener("touchend",l,!0),()=>{e.removeEventListener("touchstart",c,!0),e.removeEventListener("touchend",l,!0)}},w=async(e,t,n,i,a)=>{if(!n&&!i)return;const c=v(e,n||i,a);if(n&&Math.abs(c.scrollAmount)<4)t.focus();else if(s(e,t,!0,c.inputSafeY),t.focus(),(0,r.r)((()=>e.click())),"undefined"!==typeof window){let r;const i=async()=>{void 0!==r&&clearTimeout(r),window.removeEventListener("ionKeyboardDidShow",a),window.removeEventListener("ionKeyboardDidShow",i),n&&await(0,o.b)(n,0,c.scrollAmount,c.scrollDuration),s(e,t,!1,c.inputSafeY),t.focus()},a=()=>{window.removeEventListener("ionKeyboardDidShow",a),window.addEventListener("ionKeyboardDidShow",i)};if(n){const e=await(0,o.g)(n),s=e.scrollHeight-e.clientHeight;if(c.scrollAmount>s-e.scrollTop)return"password"===t.type?(c.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",a)):window.addEventListener("ionKeyboardDidShow",i),void(r=setTimeout(i,1e3))}i()}},E=(e,t,n)=>{if(t&&n){const o=t.x-n.x,r=t.y-n.y,i=o*o+r*r;return i>e*e}return!1},g="$ionPaddingTimer",y=e=>{const t=document,n=t=>{b(t.target,e)},o=e=>{b(e.target,0)};return t.addEventListener("focusin",n),t.addEventListener("focusout",o),()=>{t.removeEventListener("focusin",n),t.removeEventListener("focusout",o)}},b=(e,t)=>{var n,r;if("INPUT"!==e.tagName)return;if(e.parentElement&&"ION-INPUT"===e.parentElement.tagName)return;if("ION-SEARCHBAR"===(null===(r=null===(n=e.parentElement)||void 0===n?void 0:n.parentElement)||void 0===r?void 0:r.tagName))return;const i=(0,o.a)(e);if(null===i)return;const s=i[g];s&&clearTimeout(s),t>0?i.style.setProperty("--keyboard-offset",`${t}px`):i[g]=setTimeout((()=>{i.style.setProperty("--keyboard-offset","0px")}),120)},S=!0,L=!0,D=e=>{const t=document,n=e.getNumber("keyboardHeight",290),i=e.getBoolean("scrollAssist",!0),s=e.getBoolean("hideCaretOnScroll",!0),a=e.getBoolean("inputBlurring",!0),c=e.getBoolean("scrollPadding",!0),l=Array.from(t.querySelectorAll("ion-input, ion-textarea")),u=new WeakMap,f=new WeakMap,v=async e=>{await new Promise((t=>(0,r.c)(e,t)));const t=e.shadowRoot||e,a=t.querySelector("input")||t.querySelector("textarea"),c=(0,o.a)(e),l=c?null:e.closest("ion-footer");if(a){if(c&&s&&!u.has(e)){const t=d(e,a,c);u.set(e,t)}if((c||l)&&i&&!f.has(e)){const t=h(e,a,c,l,n);f.set(e,t)}}},p=e=>{if(s){const t=u.get(e);t&&t(),u.delete(e)}if(i){const t=f.get(e);t&&t(),f.delete(e)}};a&&S&&m(),c&&L&&y(n);for(const o of l)v(o);t.addEventListener("ionInputDidLoad",(e=>{v(e.detail)})),t.addEventListener("ionInputDidUnload",(e=>{p(e.detail)}))}}}]);
//# sourceMappingURL=775.a1316a49.js.map