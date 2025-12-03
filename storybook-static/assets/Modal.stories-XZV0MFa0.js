import{r as M,R as e}from"./index-GiUgBvb1.js";import{B as r}from"./button-DUj6OYKK.js";import"./iframe-B75O12d3.js";function p({isOpen:t,title:n,children:i,onClose:m,actions:u,size:y="medium"}){if(!t)return null;const N=a=>{a.target===a.currentTarget&&m()};M.useEffect(()=>{const a=B=>{B.key==="Escape"&&m()};return window.addEventListener("keydown",a),()=>{window.removeEventListener("keydown",a)}},[m]);const R=y==="large"?"w-[1200px]":"w-[600px]",W=y==="large"?"1200px":"600px";return e.createElement("div",{className:"fixed inset-[-32px] bg-black bg-opacity-50 flex items-center justify-center z-50",onClick:N,role:"dialog","aria-labelledby":"modal-title","aria-modal":"true",tabIndex:-1},e.createElement("div",{className:`bg-light-background-default dark:bg-dark-background-default rounded-[8px] ${R}`,style:{maxWidth:W,width:"calc(100vw - 64px)",maxHeight:"800px",height:"auto",overflowY:"auto"}},e.createElement("div",{className:"px-6 py-3 border-b border-light-misc-divider dark:border-dark-misc-divider flex justify-between items-center"},n&&e.createElement("h2",{id:"modal-title",className:"text-h4 text-light-text-primary dark:text-dark-text-primary"},n),u&&e.createElement("div",{className:"flex space-x-2"},u)),e.createElement("div",{className:"text-body1 space-y-4 text-light-text-primary dark:text-dark-text-primary p-6"},i)))}p.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'large'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}}}};const O={title:"Components/Modal",component:p,argTypes:{title:{control:"text"},size:{control:"select",options:["medium","large"]}}},c=t=>{const[n,i]=M.useState(!1);return e.createElement("div",null,e.createElement(r,{size:"medium",type:"primary",state:"enabled",label:"Open Modal",onClickButton:()=>i(!0)}),e.createElement(p,{...t,isOpen:n,onClose:()=>i(!1)},t.children))},l={render:t=>e.createElement(c,{...t}),args:{title:"Modal Title",children:"This is the modal content. You can put any content here.",size:"medium",actions:e.createElement("div",{style:{display:"flex",gap:"8px"}},e.createElement(r,{size:"medium",type:"tertiary",state:"enabled",label:"Cancel"}),e.createElement(r,{size:"medium",type:"primary",state:"enabled",label:"Confirm"}))}},s={render:t=>e.createElement(c,{...t}),args:{title:"Large Modal",children:"This is a larger modal for more complex content.",size:"large"}},o={render:t=>e.createElement(c,{...t}),args:{children:"Modal without a title. Content goes directly here.",size:"medium"}},d={render:t=>e.createElement(c,{...t}),args:{title:"Confirm Action",children:"Are you sure you want to proceed with this action?",size:"medium",actions:e.createElement("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end",width:"100%"}},e.createElement(r,{size:"medium",type:"tertiary",state:"enabled",label:"Cancel"}),e.createElement(r,{size:"medium",type:"primary",state:"enabled",label:"Delete"}))}};var g,h,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <ModalWrapper {...args} />,
  args: {
    title: "Modal Title",
    children: "This is the modal content. You can put any content here.",
    size: "medium",
    actions: <div style={{
      display: "flex",
      gap: "8px"
    }}>
        <Button size="medium" type="tertiary" state="enabled" label="Cancel" />
        <Button size="medium" type="primary" state="enabled" label="Confirm" />
      </div>
  }
}`,...(f=(h=l.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var x,b,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ModalWrapper {...args} />,
  args: {
    title: "Large Modal",
    children: "This is a larger modal for more complex content.",
    size: "large"
  }
}`,...(v=(b=s.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var w,E,z;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <ModalWrapper {...args} />,
  args: {
    children: "Modal without a title. Content goes directly here.",
    size: "medium"
  }
}`,...(z=(E=o.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var k,C,T;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <ModalWrapper {...args} />,
  args: {
    title: "Confirm Action",
    children: "Are you sure you want to proceed with this action?",
    size: "medium",
    actions: <div style={{
      display: "flex",
      gap: "8px",
      justifyContent: "flex-end",
      width: "100%"
    }}>
        <Button size="medium" type="tertiary" state="enabled" label="Cancel" />
        <Button size="medium" type="primary" state="enabled" label="Delete" />
      </div>
  }
}`,...(T=(C=d.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};const D=["Default","Large","NoTitle","WithActions"];export{l as Default,s as Large,o as NoTitle,d as WithActions,D as __namedExportsOrder,O as default};
