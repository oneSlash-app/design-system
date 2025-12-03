import{R as r}from"./index-GiUgBvb1.js";import{C as u}from"./circle-alert-7q9cGP-1.js";function d({text:a,size:p}){const s="text-light-text-disabled dark:text-dark-text-disabled",g=p==="small"?"py-6":"h-full";return r.createElement("div",{className:`flex flex-col space-y-2 justify-center items-center w-full ${g}`},r.createElement(u,{className:`size-6 ${s}`,strokeWidth:2}),r.createElement("p",{className:`text-body1 text-center ${s}`},a))}d.__docgenInfo={description:"",methods:[],displayName:"EmptyBox",props:{text:{required:!0,tsType:{name:"string"},description:""},size:{required:!0,tsType:{name:"union",raw:'"small" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"large"'}]},description:""}}};const h={title:"Components/EmptyBox",component:d,argTypes:{text:{control:"text"},size:{control:"select",options:["small","large"]}}},e={args:{text:"No items found",size:"small"}},t={args:{text:"No data available. Try adding some items to get started.",size:"large"},decorators:[a=>React.createElement("div",{style:{height:"300px"}},React.createElement(a,null))]};var o,l,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    text: "No items found",
    size: "small"
  }
}`,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var i,c,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    text: "No data available. Try adding some items to get started.",
    size: "large"
  },
  decorators: [Story => <div style={{
    height: "300px"
  }}>
        <Story />
      </div>]
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const z=["Small","Large"];export{t as Large,e as Small,z as __namedExportsOrder,h as default};
