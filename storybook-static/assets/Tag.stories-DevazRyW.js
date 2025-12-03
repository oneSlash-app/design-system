import{R as e}from"./index-GiUgBvb1.js";import{T as a}from"./tag-t_KldOc1.js";import"./lucide-react-BvaQksD2.js";import"./circle-alert-7q9cGP-1.js";const R={title:"Components/Tag",component:a,argTypes:{variant:{control:"select",options:["contained","textOnly"]},size:{control:"select",options:["medium","small"]},state:{control:"select",options:["enabled","selected"]},label:{control:"text"},iconName:{control:"text"}}},n={args:{variant:"contained",size:"medium",state:"enabled",label:"Tag Label"}},t={args:{variant:"textOnly",size:"medium",state:"enabled",label:"Text Tag"}},r={args:{variant:"contained",size:"medium",state:"selected",label:"Selected"}},s={args:{variant:"contained",size:"medium",state:"enabled",label:"With Icon",iconName:"Star"}},l={args:{variant:"contained",size:"small",state:"enabled",label:"Small Tag"}},i={args:{variant:"contained",size:"medium",state:"enabled",label:"Click me",onClick:()=>alert("Tag clicked!")}},o={render:()=>e.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},e.createElement(a,{variant:"contained",size:"medium",label:"Contained"}),e.createElement(a,{variant:"textOnly",size:"medium",label:"Text Only"}),e.createElement(a,{variant:"contained",size:"medium",state:"selected",label:"Selected"}),e.createElement(a,{variant:"contained",size:"small",label:"Small"}),e.createElement(a,{variant:"contained",size:"medium",label:"With Icon",iconName:"Check"}))};var c,m,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: "contained",
    size: "medium",
    state: "enabled",
    label: "Tag Label"
  }
}`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,u,b;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: "textOnly",
    size: "medium",
    state: "enabled",
    label: "Text Tag"
  }
}`,...(b=(u=t.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var g,v,z;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: "contained",
    size: "medium",
    state: "selected",
    label: "Selected"
  }
}`,...(z=(v=r.parameters)==null?void 0:v.docs)==null?void 0:z.source}}};var T,x,S;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: "contained",
    size: "medium",
    state: "enabled",
    label: "With Icon",
    iconName: "Star"
  }
}`,...(S=(x=s.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var y,C,k;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: "contained",
    size: "small",
    state: "enabled",
    label: "Small Tag"
  }
}`,...(k=(C=l.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var O,h,W;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    variant: "contained",
    size: "medium",
    state: "enabled",
    label: "Click me",
    onClick: () => alert("Tag clicked!")
  }
}`,...(W=(h=i.parameters)==null?void 0:h.docs)==null?void 0:W.source}}};var f,E,I;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  }}>
      <Tag variant="contained" size="medium" label="Contained" />
      <Tag variant="textOnly" size="medium" label="Text Only" />
      <Tag variant="contained" size="medium" state="selected" label="Selected" />
      <Tag variant="contained" size="small" label="Small" />
      <Tag variant="contained" size="medium" label="With Icon" iconName="Check" />
    </div>
}`,...(I=(E=o.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const V=["Contained","TextOnly","Selected","WithIcon","Small","Clickable","AllVariants"];export{o as AllVariants,i as Clickable,n as Contained,r as Selected,l as Small,t as TextOnly,s as WithIcon,V as __namedExportsOrder,R as default};
