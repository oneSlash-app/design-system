import{r as S}from"./index-GiUgBvb1.js";function N({label:d,checked:D=!1,onChange:l,disabled:e=!1}){const[a,T]=S.useState(D),R=()=>{if(e)return;const n=!a;T(n),l&&l(n)};return React.createElement("label",{className:`flex items-center ${e?"cursor-not-allowed":"cursor-pointer"}`},React.createElement("div",{onClick:R,className:"relative flex items-center justify-center w-6 h-6 group transition-colors duration-200 ease-in-out"},React.createElement("div",{className:`absolute w-6 h-6 rounded-full ${e?"":"group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected"}`}),React.createElement("div",{className:`relative z-10 w-4 h-4 border-2 rounded ${e?a?"bg-light-text-disabled dark:bg-dark-text-disabled border-none":"border-light-text-disabled dark:border-dark-text-disabled":a?"bg-light-text-primary dark:bg-dark-text-primary border-none":"border-light-text-secondary dark:border-dark-text-secondary"} flex items-center justify-center`},a&&React.createElement("svg",{className:"w-3 h-3 text-light-text-contrast dark:text-dark-text-contrast",fill:"none",stroke:"currentColor",viewBox:"0 0 12 12",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{strokeWidth:"2",d:"M1 6l4 3 6-7"})))),d&&React.createElement("span",{className:`ml-2 text-body1 ${e?"text-light-text-disabled dark:text-dark-text-disabled":"text-light-text-primary dark:text-dark-text-primary"}`},d))}N.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{required:!1,tsType:{name:"string"},description:""},checked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const I={title:"Components/Checkbox",component:N,argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"}}},t={args:{label:"Accept terms and conditions",checked:!1,disabled:!1}},r={args:{label:"I agree to the privacy policy",checked:!0,disabled:!1}},s={args:{label:"This option is disabled",checked:!1,disabled:!0}},o={args:{label:"Disabled and checked",checked:!0,disabled:!0}},c={args:{checked:!1,disabled:!1}};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: "Accept terms and conditions",
    checked: false,
    disabled: false
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,b,h;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: "I agree to the privacy policy",
    checked: true,
    disabled: false
  }
}`,...(h=(b=r.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var g,k,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: "This option is disabled",
    checked: false,
    disabled: true
  }
}`,...(f=(k=s.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var x,y,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: "Disabled and checked",
    checked: true,
    disabled: true
  }
}`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var C,w,E;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    checked: false,
    disabled: false
  }
}`,...(E=(w=c.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};const _=["Default","Checked","Disabled","DisabledChecked","NoLabel"];export{r as Checked,t as Default,s as Disabled,o as DisabledChecked,c as NoLabel,_ as __namedExportsOrder,I as default};
