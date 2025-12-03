import{r as P,R as a}from"./index-GiUgBvb1.js";function v({id:e,label:n,value:l,onChange:s,onBlur:i,onFocus:o,onKeyDown:y,autoFocus:L=!1,multiline:Q=!1,maxRows:U=6,disabled:d=!1,error:E=!1,size:X="medium"}){const[Y,m]=P.useState(!1),z=`
    bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out
    border-light-outlinedBorder-active dark:border-dark-outlinedBorder-active
    w-full border rounded-[8px]
    ${{large:"text-body1 p-[7px] leading-[22px]",medium:"text-body1 p-[3px] leading-[22px]",small:"text-body2 p-[3px] leading-[18px]"}[X]}
    ${d?"bg-gray-200 cursor-not-allowed":""}
    ${E?"border-red-500 focus:ring-red-500":""}
    ${Y?"focus:border-light-accent-main focus:dark:border-dark-accent-main outline-none":""}
    ${!d&&!E?"hover:border-light-outlinedBorder-hover":""}
    border-gray-300
  `;return a.createElement("div",{className:"flex flex-col w-full"},n&&a.createElement("label",{htmlFor:e,className:"mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary"},n),a.createElement("div",{className:"relative"},Q?a.createElement("textarea",{id:e,rows:U,className:z,value:l,onChange:s,onFocus:t=>{m(!0),o&&o(t)},onBlur:t=>{m(!1),i&&i(t)},onKeyDown:y,autoFocus:L,disabled:d,autoComplete:"off"}):a.createElement("input",{id:e,type:"text",className:z,value:l,onChange:s,onFocus:t=>{m(!0),o&&o(t)},onBlur:t=>{m(!1),i&&i(t)},onKeyDown:y,autoFocus:L,disabled:d,autoComplete:"off"})),E&&a.createElement("p",{className:"mt-1 text-light-error-main text-body2"},"This field is required"))}v.__docgenInfo={description:"",methods:[],displayName:"TextField",props:{id:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>",elements:[{name:"union",raw:"HTMLInputElement | HTMLTextAreaElement",elements:[{name:"HTMLInputElement"},{name:"HTMLTextAreaElement"}]}]},name:"e"}],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>",elements:[{name:"union",raw:"HTMLInputElement | HTMLTextAreaElement",elements:[{name:"HTMLInputElement"},{name:"HTMLTextAreaElement"}]}]},name:"e"}],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>",elements:[{name:"union",raw:"HTMLInputElement | HTMLTextAreaElement",elements:[{name:"HTMLInputElement"},{name:"HTMLTextAreaElement"}]}]},name:"e"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>",elements:[{name:"union",raw:"HTMLInputElement | HTMLTextAreaElement",elements:[{name:"HTMLInputElement"},{name:"HTMLTextAreaElement"}]}]},name:"e"}],return:{name:"void"}}},description:""},autoFocus:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},multiline:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},maxRows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'large' | 'medium' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'small'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}}}};const ne={title:"Components/TextField",component:v,argTypes:{label:{control:"text"},disabled:{control:"boolean"},error:{control:"boolean"},multiline:{control:"boolean"},maxRows:{control:"number"},size:{control:"select",options:["large","medium","small"]}}},r=e=>{const[n,l]=P.useState(e.value||"");return a.createElement(v,{...e,value:n,onChange:s=>l(s.target.value)})},u={render:e=>a.createElement(r,{...e}),args:{id:"default-textfield",label:"Label",value:"",size:"medium"}},c={render:e=>a.createElement(r,{...e}),args:{id:"with-value-textfield",label:"Name",value:"John Doe",size:"medium"}},p={render:e=>a.createElement(r,{...e}),args:{id:"disabled-textfield",label:"Disabled Field",value:"Cannot edit",disabled:!0,size:"medium"}},g={render:e=>a.createElement(r,{...e}),args:{id:"error-textfield",label:"Required Field",value:"",error:!0,size:"medium"}},x={render:e=>a.createElement(r,{...e}),args:{id:"large-textfield",label:"Large Input",value:"",size:"large"}},f={render:e=>a.createElement(r,{...e}),args:{id:"small-textfield",label:"Small Input",value:"",size:"small"}},T={render:e=>a.createElement(r,{...e}),args:{id:"multiline-textfield",label:"Description",value:"",multiline:!0,maxRows:4,size:"medium"}},b={render:()=>a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"300px"}},a.createElement(r,{id:"size-small",label:"Small",size:"small"}),a.createElement(r,{id:"size-medium",label:"Medium",size:"medium"}),a.createElement(r,{id:"size-large",label:"Large",size:"large"}))};var M,H,F;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "default-textfield",
    label: "Label",
    value: "",
    size: "medium"
  }
}`,...(F=(H=u.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var h,w,I;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "with-value-textfield",
    label: "Name",
    value: "John Doe",
    size: "medium"
  }
}`,...(I=(w=c.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var S,R,A;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "disabled-textfield",
    label: "Disabled Field",
    value: "Cannot edit",
    disabled: true,
    size: "medium"
  }
}`,...(A=(R=p.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var C,W,q;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "error-textfield",
    label: "Required Field",
    value: "",
    error: true,
    size: "medium"
  }
}`,...(q=(W=g.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var D,k,N;x.parameters={...x.parameters,docs:{...(D=x.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "large-textfield",
    label: "Large Input",
    value: "",
    size: "large"
  }
}`,...(N=(k=x.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var V,$,_;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "small-textfield",
    label: "Small Input",
    value: "",
    size: "small"
  }
}`,...(_=($=f.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};var B,K,J;T.parameters={...T.parameters,docs:{...(B=T.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <TextFieldWrapper {...args} />,
  args: {
    id: "multiline-textfield",
    label: "Description",
    value: "",
    multiline: true,
    maxRows: 4,
    size: "medium"
  }
}`,...(J=(K=T.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var O,j,G;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "300px"
  }}>
      <TextFieldWrapper id="size-small" label="Small" size="small" />
      <TextFieldWrapper id="size-medium" label="Medium" size="medium" />
      <TextFieldWrapper id="size-large" label="Large" size="large" />
    </div>
}`,...(G=(j=b.parameters)==null?void 0:j.docs)==null?void 0:G.source}}};const le=["Default","WithValue","Disabled","WithError","LargeSize","SmallSize","Multiline","AllSizes"];export{b as AllSizes,u as Default,p as Disabled,x as LargeSize,T as Multiline,f as SmallSize,g as WithError,c as WithValue,le as __namedExportsOrder,ne as default};
