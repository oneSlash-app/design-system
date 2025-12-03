import{R as e}from"./index-GiUgBvb1.js";import{L as B,a as r}from"./loadingScreen-DfWUTmRk.js";const A={title:"Components/LoadingScreen",component:B},a={decorators:[f=>e.createElement("div",{style:{height:"300px"}},e.createElement(f,null))]},n={render:()=>e.createElement(r,{size:"small"})},t={render:()=>e.createElement(r,{size:"medium"})},s={render:()=>e.createElement(r,{size:"large"})},l={render:()=>e.createElement("div",{style:{display:"flex",gap:"24px",alignItems:"center"}},e.createElement("div",null,e.createElement("p",{style:{marginBottom:"8px"}},"Small"),e.createElement(r,{size:"small"})),e.createElement("div",null,e.createElement("p",{style:{marginBottom:"8px"}},"Medium"),e.createElement(r,{size:"medium"})),e.createElement("div",null,e.createElement("p",{style:{marginBottom:"8px"}},"Large"),e.createElement(r,{size:"large"})))};var m,o,i;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    height: "300px"
  }}>
        <Story />
      </div>]
}`,...(i=(o=a.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var d,c,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <LoadingSmall size="small" />
}`,...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,u,S;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <LoadingSmall size="medium" />
}`,...(S=(u=t.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var E,v,x;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <LoadingSmall size="large" />
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var y,z,L;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "24px",
    alignItems: "center"
  }}>
      <div>
        <p style={{
        marginBottom: "8px"
      }}>Small</p>
        <LoadingSmall size="small" />
      </div>
      <div>
        <p style={{
        marginBottom: "8px"
      }}>Medium</p>
        <LoadingSmall size="medium" />
      </div>
      <div>
        <p style={{
        marginBottom: "8px"
      }}>Large</p>
        <LoadingSmall size="large" />
      </div>
    </div>
}`,...(L=(z=l.parameters)==null?void 0:z.docs)==null?void 0:L.source}}};const D=["Default","Small","Medium","Large","AllSizes"];export{l as AllSizes,a as Default,s as Large,t as Medium,n as Small,D as __namedExportsOrder,A as default};
