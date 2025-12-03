import{R as s,r as v}from"./index-GiUgBvb1.js";import{T as D,a as y}from"./tabsContainer-CNKfV385.js";import"./iframe-B75O12d3.js";import"./app-router-context.shared-runtime-uhJskNH8.js";const _={title:"Components/Tab",component:D,argTypes:{label:{control:"text"},isSelected:{control:"boolean"},decoIcon:{control:"text"},actionIcon:{control:"text"}}},e={args:{label:"Tab Label",isSelected:!1,onClickTab:()=>{}}},a={args:{label:"Selected Tab",isSelected:!0,onClickTab:()=>{}}},o={args:{label:"With Icon",isSelected:!1,decoIcon:"Home",onClickTab:()=>{}}},r={args:{label:"With Action",isSelected:!1,actionIcon:"X",onClickTab:()=>{}}},c={args:{label:"Full Tab",isSelected:!0,decoIcon:"File",actionIcon:"X",onClickTab:()=>{}}},B=()=>{const[F,G]=v.useState(0),X=["Overview","Projects","Tasks","Settings"];return s.createElement(y,null,X.map((n,l)=>s.createElement(D,{key:n,label:n,isSelected:F===l,onClickTab:()=>G(l)})))},t={render:()=>s.createElement(B,null)};var i,d,p;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: "Tab Label",
    isSelected: false,
    onClickTab: () => {}
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,b,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: "Selected Tab",
    isSelected: true,
    onClickTab: () => {}
  }
}`,...(u=(b=a.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var T,S,g;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: "With Icon",
    isSelected: false,
    decoIcon: "Home",
    onClickTab: () => {}
  }
}`,...(g=(S=o.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var I,k,C;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: "With Action",
    isSelected: false,
    actionIcon: "X",
    onClickTab: () => {}
  }
}`,...(C=(k=r.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var h,W,f;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: "Full Tab",
    isSelected: true,
    decoIcon: "File",
    actionIcon: "X",
    onClickTab: () => {}
  }
}`,...(f=(W=c.parameters)==null?void 0:W.docs)==null?void 0:f.source}}};var x,E,A;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <TabGroupWrapper />
}`,...(A=(E=t.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};const j=["Default","Selected","WithDecoIcon","WithActionIcon","WithBothIcons","TabGroup"];export{e as Default,a as Selected,t as TabGroup,r as WithActionIcon,c as WithBothIcons,o as WithDecoIcon,j as __namedExportsOrder,_ as default};
