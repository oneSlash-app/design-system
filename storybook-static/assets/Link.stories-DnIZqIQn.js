import{R as e}from"./index-GiUgBvb1.js";import{N as q}from"./link-BV4SGL2C.js";import"./app-router-context.shared-runtime-uhJskNH8.js";import"./jsx-runtime-CDt2p4po.js";function r({href:t,children:c,color:N="info",size:T="body1",openInNewTab:C=!1,className:W=""}){const l={info:{default:"text-light-info-main dark:text-dark-info-main",hover:"hover:text-light-info-dark hover:dark:text-dark-info-dark",visited:"visited:text-light-info-light visited:dark:text-dark-info-light"},error:{default:"text-light-error-main dark:text-dark-error-main",hover:"hover:text-light-error-dark hover:dark:text-dark-error-dark",visited:"visited:text-light-error-light visited:dark:text-dark-error-light"},warning:{default:"text-light-warning-main dark:text-dark-warning-main",hover:"hover:text-light-warning-dark hover:dark:text-dark-warning-dark",visited:"visited:text-light-warning-light visited:dark:text-dark-warning-light"},success:{default:"text-light-success-main dark:text-dark-success-main",hover:"hover:text-light-success-dark hover:dark:text-dark-success-dark",visited:"visited:text-light-success-light visited:dark:text-dark-success-light"}}[N],d=t.startsWith("http://")||t.startsWith("https://"),m=C||d,p={className:`
    text-${T}
    ${l.default}
    ${l.hover}
    ${l.visited}
    underline
    underline-offset-[2px]
    decoration-2
    cursor-pointer
    transition-colors
    duration-200
    ease-in-out
    ${W}
  `.trim().replace(/\s+/g," "),...m&&{target:"_blank",rel:"noopener noreferrer"}};return d||m?e.createElement("a",{href:t,...p},c):e.createElement(q,{href:t,...p},c)}r.__docgenInfo={description:"",methods:[],displayName:"Link",props:{href:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!1,tsType:{name:"union",raw:"'info' | 'error' | 'warning' | 'success'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'success'"}]},description:"",defaultValue:{value:"'info'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption'",elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"},{name:"literal",value:"'h5'"},{name:"literal",value:"'h6'"},{name:"literal",value:"'subtitle1'"},{name:"literal",value:"'subtitle2'"},{name:"literal",value:"'body1'"},{name:"literal",value:"'body2'"},{name:"literal",value:"'caption'"}]},description:"",defaultValue:{value:"'body1'",computed:!1}},openInNewTab:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const P={title:"Components/Link",component:r,argTypes:{href:{control:"text"},color:{control:"select",options:["info","error","warning","success"]},size:{control:"select",options:["h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","caption"]},openInNewTab:{control:"boolean"}}},a={args:{href:"https://example.com",children:"Info Link",color:"info",size:"body1"}},o={args:{href:"https://example.com",children:"Error Link",color:"error",size:"body1"}},n={args:{href:"https://example.com",children:"Warning Link",color:"warning",size:"body1"}},s={args:{href:"https://example.com",children:"Success Link",color:"success",size:"body1"}},i={render:()=>e.createElement("div",{style:{display:"flex",gap:"16px"}},e.createElement(r,{href:"https://example.com",color:"info"},"Info"),e.createElement(r,{href:"https://example.com",color:"error"},"Error"),e.createElement(r,{href:"https://example.com",color:"warning"},"Warning"),e.createElement(r,{href:"https://example.com",color:"success"},"Success"))};var u,h,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    href: "https://example.com",
    children: "Info Link",
    color: "info",
    size: "body1"
  }
}`,...(f=(h=a.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var g,k,x;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    href: "https://example.com",
    children: "Error Link",
    color: "error",
    size: "body1"
  }
}`,...(x=(k=o.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};var v,b,y;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    href: "https://example.com",
    children: "Warning Link",
    color: "warning",
    size: "body1"
  }
}`,...(y=(b=n.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var w,L,E;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    href: "https://example.com",
    children: "Success Link",
    color: "success",
    size: "body1"
  }
}`,...(E=(L=s.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var S,z,I;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px"
  }}>
      <Link href="https://example.com" color="info">Info</Link>
      <Link href="https://example.com" color="error">Error</Link>
      <Link href="https://example.com" color="warning">Warning</Link>
      <Link href="https://example.com" color="success">Success</Link>
    </div>
}`,...(I=(z=i.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};const j=["Info","Error","Warning","Success","AllColors"];export{i as AllColors,o as Error,a as Info,s as Success,n as Warning,j as __namedExportsOrder,P as default};
