import{R as e}from"./index-GiUgBvb1.js";import{U as r}from"./userImage-BwmgTY4g.js";const f={title:"Components/UserImage",component:r,argTypes:{userHandle:{control:"text"},userImgUrl:{control:"text"}}},a={args:{userHandle:"John Doe"}},s={args:{userHandle:"Alice"}},n={args:{userHandle:"Jane Smith",userImgUrl:"https://i.pravatar.cc/150?img=1"}},t={render:()=>e.createElement("div",{style:{display:"flex",gap:"8px"}},e.createElement(r,{userHandle:"Alice Brown"}),e.createElement(r,{userHandle:"Bob Smith"}),e.createElement(r,{userHandle:"Carol Davis"}),e.createElement(r,{userHandle:"David Lee"}),e.createElement(r,{userHandle:"Emma Wilson"}),e.createElement(r,{userHandle:"Frank Miller"}))},l={render:()=>e.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},e.createElement(r,{userHandle:"John Doe",userImgUrl:"https://i.pravatar.cc/150?img=1"}),e.createElement(r,{userHandle:"Alice Brown"}),e.createElement(r,{userHandle:"Jane Smith",userImgUrl:"https://i.pravatar.cc/150?img=5"}),e.createElement(r,{userHandle:"Bob Wilson"}),e.createElement(r,{userHandle:"Carol Davis",userImgUrl:"https://i.pravatar.cc/150?img=9"}))};var m,i,o;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    userHandle: "John Doe"
  }
}`,...(o=(i=a.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var c,d,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    userHandle: "Alice"
  }
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,u,I;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    userHandle: "Jane Smith",
    userImgUrl: "https://i.pravatar.cc/150?img=1"
  }
}`,...(I=(u=n.parameters)==null?void 0:u.docs)==null?void 0:I.source}}};var H,U,h;t.parameters={...t.parameters,docs:{...(H=t.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px"
  }}>
      <UserImage userHandle="Alice Brown" />
      <UserImage userHandle="Bob Smith" />
      <UserImage userHandle="Carol Davis" />
      <UserImage userHandle="David Lee" />
      <UserImage userHandle="Emma Wilson" />
      <UserImage userHandle="Frank Miller" />
    </div>
}`,...(h=(U=t.parameters)==null?void 0:U.docs)==null?void 0:h.source}}};var v,E,x;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <UserImage userHandle="John Doe" userImgUrl="https://i.pravatar.cc/150?img=1" />
      <UserImage userHandle="Alice Brown" />
      <UserImage userHandle="Jane Smith" userImgUrl="https://i.pravatar.cc/150?img=5" />
      <UserImage userHandle="Bob Wilson" />
      <UserImage userHandle="Carol Davis" userImgUrl="https://i.pravatar.cc/150?img=9" />
    </div>
}`,...(x=(E=l.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};const W=["WithInitial","SingleName","WithImage","DifferentUsers","MixedWithImages"];export{t as DifferentUsers,l as MixedWithImages,s as SingleName,n as WithImage,a as WithInitial,W as __namedExportsOrder,f as default};
