import{r as c,R as r}from"./index-GiUgBvb1.js";function v({id:e,label:s,value:p,onChange:g,onBlur:T,onFocus:E,onKeyDown:J,autoFocus:P=!1,maxRows:h=6,disabled:x=!1,error:b=!1,size:Q="medium"}){const y=c.useRef(null),[U,w]=c.useState(!1);c.useEffect(()=>{const a=y.current;if(!a)return;const f=()=>{a.style.height="auto";const z=parseInt(getComputedStyle(a).lineHeight),R=z*h,H=a.scrollHeight;a.style.height=`${Math.max(Math.min(H,R),z)}px`,a.style.overflowY=H>R?"auto":"hidden"};return a.rows=1,f(),a.addEventListener("input",f),()=>a.removeEventListener("input",f)},[h]);const X=`
    bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out
    border-light-outlinedBorder-active dark:border-dark-outlinedBorder-active
    w-full border rounded-[8px]
    ${{large:"text-body1 p-[7px] leading-[22px]",medium:"text-body1 p-[3px] leading-[22px]",small:"text-body2 p-[3px] leading-[18px]"}[Q]}
    ${x?"bg-gray-200 cursor-not-allowed":""}
    ${b?"border-red-500 focus:ring-red-500":""}
    ${U?"focus:border-light-accent-main focus:dark:border-dark-accent-main outline-none":""}
    ${!x&&!b?"hover:border-light-outlinedBorder-hover":""}
    border-gray-300
  `;return r.createElement("div",{className:"flex flex-col w-full"},s&&r.createElement("label",{htmlFor:e,className:"mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary"},s),r.createElement("div",{className:"relative"},r.createElement("textarea",{ref:y,id:e,rows:1,className:X,value:p,onChange:g,onFocus:a=>{w(!0),E&&E(a)},onBlur:a=>{w(!1),T&&T(a)},onKeyDown:J,autoFocus:P,disabled:x,autoComplete:"off"})),b&&r.createElement("p",{className:"mt-1 text-light-error-main text-body2"},"This field is required"))}v.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{id:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: React.ChangeEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}]},name:"e"}],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.FocusEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}]},name:"e"}],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.FocusEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}]},name:"e"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}]},name:"e"}],return:{name:"void"}}},description:""},autoFocus:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},maxRows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'large' | 'medium' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'small'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}}}};const se={title:"Components/Textarea",component:v,argTypes:{label:{control:"text"},disabled:{control:"boolean"},error:{control:"boolean"},maxRows:{control:"number"},size:{control:"select",options:["large","medium","small"]}}},t=e=>{const[s,p]=c.useState(e.value||"");return r.createElement(v,{...e,value:s,onChange:g=>p(g.target.value)})},n={render:e=>r.createElement(t,{...e}),args:{id:"default-textarea",label:"Description",value:"",size:"medium"}},l={render:e=>r.createElement(t,{...e}),args:{id:"with-value-textarea",label:"Notes",value:"This is some sample text that demonstrates the textarea component.",size:"medium"}},o={render:e=>r.createElement(t,{...e}),args:{id:"disabled-textarea",label:"Disabled",value:"This textarea is disabled",disabled:!0,size:"medium"}},i={render:e=>r.createElement(t,{...e}),args:{id:"error-textarea",label:"Required Field",value:"",error:!0,size:"medium"}},d={render:e=>r.createElement(t,{...e}),args:{id:"large-textarea",label:"Large Textarea",value:"",size:"large"}},u={render:e=>r.createElement(t,{...e}),args:{id:"small-textarea",label:"Small Textarea",value:"",size:"small"}},m={render:e=>r.createElement(t,{...e}),args:{id:"auto-expand-textarea",label:"Type to see auto-expansion (max 6 rows)",value:"",maxRows:6,size:"medium"}};var L,S,C;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "default-textarea",
    label: "Description",
    value: "",
    size: "medium"
  }
}`,...(C=(S=n.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var q,A,M;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "with-value-textarea",
    label: "Notes",
    value: "This is some sample text that demonstrates the textarea component.",
    size: "medium"
  }
}`,...(M=(A=l.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var F,W,k;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "disabled-textarea",
    label: "Disabled",
    value: "This textarea is disabled",
    disabled: true,
    size: "medium"
  }
}`,...(k=(W=o.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var D,$,N;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "error-textarea",
    label: "Required Field",
    value: "",
    error: true,
    size: "medium"
  }
}`,...(N=($=i.parameters)==null?void 0:$.docs)==null?void 0:N.source}}};var V,B,K;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "large-textarea",
    label: "Large Textarea",
    value: "",
    size: "large"
  }
}`,...(K=(B=d.parameters)==null?void 0:B.docs)==null?void 0:K.source}}};var _,I,j;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "small-textarea",
    label: "Small Textarea",
    value: "",
    size: "small"
  }
}`,...(j=(I=u.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var O,Y,G;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <TextareaWrapper {...args} />,
  args: {
    id: "auto-expand-textarea",
    label: "Type to see auto-expansion (max 6 rows)",
    value: "",
    maxRows: 6,
    size: "medium"
  }
}`,...(G=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};const ne=["Default","WithValue","Disabled","WithError","LargeSize","SmallSize","AutoExpanding"];export{m as AutoExpanding,n as Default,o as Disabled,d as LargeSize,u as SmallSize,i as WithError,l as WithValue,ne as __namedExportsOrder,se as default};
