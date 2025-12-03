import{r as s}from"./index-GiUgBvb1.js";/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,o)=>o?o.toUpperCase():t.toLowerCase()),i=r=>{const e=y(r);return e.charAt(0).toUpperCase()+e.slice(1)},l=(...r)=>r.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim(),f=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=s.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:c="",children:a,iconNode:u,...n},p)=>s.createElement("svg",{ref:p,...w,width:e,height:e,stroke:r,strokeWidth:o?Number(t)*24/Number(e):t,className:l("lucide",c),...!a&&!f(n)&&{"aria-hidden":"true"},...n},[...u.map(([m,d])=>s.createElement(m,d)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=(r,e)=>{const t=s.forwardRef(({className:o,...c},a)=>s.createElement(h,{ref:a,iconNode:e,className:l(`lucide-${C(i(r))}`,`lucide-${r}`,o),...c}));return t.displayName=i(r),t};/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],A=x("circle-alert",g);export{A as C,h as I,x as c};
