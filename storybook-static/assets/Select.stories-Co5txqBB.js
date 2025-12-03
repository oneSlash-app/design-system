const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./lucide-react-BvaQksD2.js","./circle-alert-7q9cGP-1.js","./index-GiUgBvb1.js"])))=>i.map(i=>d[i]);
import{r as n,R as r}from"./index-GiUgBvb1.js";import{_ as le}from"./iframe-B75O12d3.js";import{M as oe}from"./menu-RlRmVxTA.js";import{M as se}from"./menuItem-BFI33Gcy.js";import{a as ie}from"./lucide-react-BvaQksD2.js";import"./link-BV4SGL2C.js";import"./app-router-context.shared-runtime-uhJskNH8.js";import"./jsx-runtime-CDt2p4po.js";import"./userImage-BwmgTY4g.js";import"./tag-t_KldOc1.js";import"./circle-alert-7q9cGP-1.js";function g({value:t,options:i,onChange:l,disabled:o=!1,placeholder:h="Label",decoIconName:k,width:y,multiple:S=!1,className:G=""}){const[s,w]=n.useState(!1),[J,x]=n.useState(!1),[N,C]=n.useState(!1),[D,Q]=n.useState(null),[E,U]=n.useState(!1),O=n.useRef(null),I=n.useRef(null);n.useEffect(()=>{U(!0)},[]);const W=n.useCallback(async e=>{if(!e)return null;try{return(await le(()=>import("./lucide-react-BvaQksD2.js").then(c=>c.L),__vite__mapDeps([0,1,2]),import.meta.url))[e]||null}catch(a){return console.error(`Failed to load icon ${e}:`,a),null}},[]);n.useEffect(()=>{(async()=>{k&&Q(await W(k))})()},[k,W]),n.useEffect(()=>{if(!E)return;const e=a=>{O.current&&I.current&&!O.current.contains(a.target)&&!I.current.contains(a.target)&&(w(!1),x(!1))};return s&&document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[s,E]);const A=()=>{o||(w(!s),x(!s))},Y=e=>{if(S){const a=Array.isArray(t)?t:[],u=a.includes(e)?a.filter(c=>c!==e):[...a,e];l==null||l(u)}else l==null||l(e),w(!1),x(!1)},Z=()=>{var e;return t?S&&Array.isArray(t)?t.length===0?h:t.map(u=>{var c;return(c=i.find(ae=>ae.value===u))==null?void 0:c.label}).filter(Boolean).join(", "):((e=i.find(a=>a.value===t))==null?void 0:e.label)||h:h},ee=e=>S&&Array.isArray(t)?t.includes(e):t===e,te=()=>o?"border border-light-actionOutlinedBorder-disabled dark:border-dark-actionOutlinedBorder-disabled":J||s?"border border-light-accent-main dark:border-dark-accent-main outline outline-1 outline-light-accent-main dark:outline-dark-accent-main outline-offset-0":"border border-light-actionOutlinedBorder-enabled dark:border-dark-actionOutlinedBorder-enabled",re=()=>N&&!s&&!o?"bg-light-action-hover dark:bg-dark-action-hover":"bg-light-background-default dark:bg-dark-background-default",ne=()=>o?"text-light-text-disabled dark:text-dark-text-disabled":"text-light-text-primary dark:text-dark-text-primary",T=()=>o?"text-light-text-disabled dark:text-dark-text-disabled":"text-light-text-secondary dark:text-dark-text-secondary";return r.createElement("div",{className:`relative ${G}`,style:{width:y||"100%"}},r.createElement("div",{ref:O,className:`
          rounded-[8px]
          ${te()}
          ${re()}
          ${o?"cursor-not-allowed":"cursor-pointer"}
          transition-all duration-200 ease-in-out
          outline-none
        `,onClick:A,onMouseEnter:()=>!o&&C(!0),onMouseLeave:()=>C(!1),tabIndex:o?-1:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),A())}},r.createElement("div",{className:`flex items-center justify-between p-2 ${ne()}`},r.createElement("div",{className:"flex items-center space-x-1 flex-1 overflow-hidden"},D&&r.createElement(D,{className:`w-6 h-6 flex-shrink-0 ${T()}`,strokeWidth:2}),r.createElement("span",{className:"text-body1 truncate"},Z())),r.createElement(ie,{className:`
              w-6 h-6 flex-shrink-0 ml-1
              ${T()}
              transition-transform duration-200
              ${s?"transform rotate-180":""}
            `,strokeWidth:2}))),E&&s&&r.createElement("div",{className:"absolute z-50 mt-1 left-0",style:{width:y||"100%"}},r.createElement(oe,{ref:I,width:y||"100%"},i.map(e=>r.createElement(se,{key:e.value,label:e.label,iconName:e.iconName,isSelected:ee(e.value),onClick:()=>Y(e.value),className:"w-full"})))))}g.__docgenInfo={description:"",methods:[],displayName:"Select",props:{value:{required:!1,tsType:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string | string[]) => void",signature:{arguments:[{type:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]},name:"value"}],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Label'",computed:!1}},decoIconName:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},multiple:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const Se={title:"Components/Select",component:g,argTypes:{placeholder:{control:"text"},disabled:{control:"boolean"},multiple:{control:"boolean"},width:{control:"text"},decoIconName:{control:"text"}}},v=t=>{const[i,l]=n.useState(t.value||"");return r.createElement(g,{...t,value:i,onChange:l})},ce=t=>{const[i,l]=n.useState(t.value||[]);return r.createElement(g,{...t,value:i,onChange:l})},d={render:t=>r.createElement(v,{...t}),args:{placeholder:"Select an option",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],width:200}},m={render:t=>r.createElement(v,{...t}),args:{placeholder:"Choose a status",options:[{value:"active",label:"Active",iconName:"CheckCircle"},{value:"pending",label:"Pending",iconName:"Clock"},{value:"inactive",label:"Inactive",iconName:"XCircle"}],width:200}},p={render:t=>r.createElement(v,{...t}),args:{placeholder:"Select category",decoIconName:"Folder",options:[{value:"work",label:"Work"},{value:"personal",label:"Personal"},{value:"other",label:"Other"}],width:200}},f={render:t=>r.createElement(v,{...t}),args:{placeholder:"Disabled select",disabled:!0,options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"}],width:200}},b={render:t=>r.createElement(ce,{...t}),args:{placeholder:"Select multiple",multiple:!0,options:[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"}],width:250}};var _,M,q;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    placeholder: "Select an option",
    options: [{
      value: "option1",
      label: "Option 1"
    }, {
      value: "option2",
      label: "Option 2"
    }, {
      value: "option3",
      label: "Option 3"
    }],
    width: 200
  }
}`,...(q=(M=d.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var B,R,$;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    placeholder: "Choose a status",
    options: [{
      value: "active",
      label: "Active",
      iconName: "CheckCircle"
    }, {
      value: "pending",
      label: "Pending",
      iconName: "Clock"
    }, {
      value: "inactive",
      label: "Inactive",
      iconName: "XCircle"
    }],
    width: 200
  }
}`,...($=(R=m.parameters)==null?void 0:R.docs)==null?void 0:$.source}}};var L,V,P;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    placeholder: "Select category",
    decoIconName: "Folder",
    options: [{
      value: "work",
      label: "Work"
    }, {
      value: "personal",
      label: "Personal"
    }, {
      value: "other",
      label: "Other"
    }],
    width: 200
  }
}`,...(P=(V=p.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var F,j,H;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    placeholder: "Disabled select",
    disabled: true,
    options: [{
      value: "option1",
      label: "Option 1"
    }, {
      value: "option2",
      label: "Option 2"
    }],
    width: 200
  }
}`,...(H=(j=f.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var X,z,K;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <MultiSelectWrapper {...args} />,
  args: {
    placeholder: "Select multiple",
    multiple: true,
    options: [{
      value: "react",
      label: "React"
    }, {
      value: "vue",
      label: "Vue"
    }, {
      value: "angular",
      label: "Angular"
    }, {
      value: "svelte",
      label: "Svelte"
    }],
    width: 250
  }
}`,...(K=(z=b.parameters)==null?void 0:z.docs)==null?void 0:K.source}}};const we=["Default","WithIcons","WithDecoIcon","Disabled","MultiSelect"];export{d as Default,f as Disabled,b as MultiSelect,p as WithDecoIcon,m as WithIcons,we as __namedExportsOrder,Se as default};
