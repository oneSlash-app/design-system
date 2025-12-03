import{r as d,R as e}from"./index-GiUgBvb1.js";import{I as $}from"./iconButton-CDJBZ69p.js";import{I as b,C as j,T as D}from"./lucide-react-BvaQksD2.js";import{C as X}from"./circle-alert-7q9cGP-1.js";import{B as F}from"./button-DUj6OYKK.js";import"./loadingScreen-DfWUTmRk.js";import"./iframe-B75O12d3.js";function y({open:r,type:a,message:n,onClose:R,showCloseButton:p=!1}){const[_,g]=d.useState(!1),[f,h]=d.useState(!1);d.useEffect(()=>{if(r){h(!0);const o=setTimeout(()=>g(!0),10);if(!p){const V=setTimeout(()=>{w()},5e3);return()=>{clearTimeout(o),clearTimeout(V)}}return()=>clearTimeout(o)}else if(f){g(!1);const o=setTimeout(()=>{h(!1)},300);return()=>clearTimeout(o)}},[r,p,f]);const w=()=>{g(!1),setTimeout(()=>{h(!1),R()},300)};if(!f)return null;const z=()=>{switch(a){case"error":return e.createElement(X,{className:"w-6 h-6",strokeWidth:2});case"warning":return e.createElement(D,{className:"w-6 h-6",strokeWidth:2});case"info":return e.createElement(b,{className:"w-6 h-6",strokeWidth:2});case"success":return e.createElement(j,{className:"w-6 h-6",strokeWidth:2});case"default":default:return e.createElement(b,{className:"w-6 h-6",strokeWidth:2})}};let s;switch(a){case"error":s="bg-light-error-main dark:bg-dark-error-main";break;case"warning":s="bg-light-warning-main dark:bg-dark-warning-main";break;case"info":s="bg-light-info-main dark:bg-dark-info-main";break;case"success":s="bg-light-success-main dark:bg-dark-success-main";break;case"default":default:s="bg-light-secondary-light dark:bg-dark-secondary-light";break}return e.createElement("div",{className:"fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none"},e.createElement("div",{className:`flex items-start justify-between w-full max-w-md p-2 rounded-[8px] pointer-events-auto transition-opacity duration-200 ease-out ${s} ${_?"opacity-100":"opacity-0"}`},e.createElement("div",{className:"flex items-start gap-2 text-light-text-primary dark:text-dark-text-primary"},z(),e.createElement("span",{className:"body1"},n)),p&&e.createElement("div",{className:"ml-4"},e.createElement($,{color:"iconOnly",state:"enabled",size:"small",iconName:"X",onClick:w}))))}y.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{open:{required:!1,tsType:{name:"boolean"},description:""},type:{required:!0,tsType:{name:"union",raw:"'success' | 'warning' | 'error' | 'info' | 'default'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"},{name:"literal",value:"'info'"},{name:"literal",value:"'default'"}]},description:""},message:{required:!0,tsType:{name:"string"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const U={title:"Components/Alert",component:y,argTypes:{type:{control:"select",options:["success","warning","error","info","default"]},message:{control:"text"},showCloseButton:{control:"boolean"}}},t=r=>{const[a,n]=d.useState(!0);return e.createElement("div",null,e.createElement(F,{size:"medium",type:"primary",state:"enabled",label:"Show Alert",onClickButton:()=>n(!0)}),e.createElement(y,{...r,open:a,onClose:()=>n(!1)}))},i={render:r=>e.createElement(t,{...r}),args:{type:"success",message:"Operation completed successfully!",showCloseButton:!0}},l={render:r=>e.createElement(t,{...r}),args:{type:"warning",message:"Please review your changes before proceeding.",showCloseButton:!0}},c={render:r=>e.createElement(t,{...r}),args:{type:"error",message:"An error occurred. Please try again.",showCloseButton:!0}},m={render:r=>e.createElement(t,{...r}),args:{type:"info",message:"This is an informational message.",showCloseButton:!0}},u={render:r=>e.createElement(t,{...r}),args:{type:"info",message:"This alert will auto-dismiss in 5 seconds.",showCloseButton:!1}};var k,E,T;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    type: "success",
    message: "Operation completed successfully!",
    showCloseButton: true
  }
}`,...(T=(E=i.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var C,v,A;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    type: "warning",
    message: "Please review your changes before proceeding.",
    showCloseButton: true
  }
}`,...(A=(v=l.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var x,B,W;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    type: "error",
    message: "An error occurred. Please try again.",
    showCloseButton: true
  }
}`,...(W=(B=c.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var N,S,I;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    type: "info",
    message: "This is an informational message.",
    showCloseButton: true
  }
}`,...(I=(S=m.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var q,O,P;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    type: "info",
    message: "This alert will auto-dismiss in 5 seconds.",
    showCloseButton: false
  }
}`,...(P=(O=u.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};const Y=["Success","Warning","Error","Info","AutoDismiss"];export{u as AutoDismiss,c as Error,m as Info,i as Success,l as Warning,Y as __namedExportsOrder,U as default};
