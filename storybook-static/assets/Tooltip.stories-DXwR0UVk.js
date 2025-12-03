import{r as o,R as e}from"./index-GiUgBvb1.js";import{B as k}from"./button-DUj6OYKK.js";import{I as n}from"./iconButton-CDJBZ69p.js";import"./iframe-B75O12d3.js";import"./lucide-react-BvaQksD2.js";import"./circle-alert-7q9cGP-1.js";import"./loadingScreen-DfWUTmRk.js";function t({title:s,children:N}){const[c,d]=o.useState(!1),[m,g]=o.useState("bottom"),p=o.useRef(null),u=o.useRef(null);o.useEffect(()=>{c&&(()=>{if(p.current&&u.current){const w=p.current.getBoundingClientRect(),C=u.current.getBoundingClientRect();window.innerHeight-C.bottom<w.height+8?g("top"):g("bottom")}})()},[c]);const I=()=>{d(!1)};return e.createElement("div",{ref:u,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),onClick:I,className:"relative inline-block"},N,c&&e.createElement("div",{ref:p,className:`absolute whitespace-nowrap text-caption rounded-[8px] py-1 px-2 z-50
              dark:bg-light-background-accent300 bg-dark-background-accent300 
              dark:text-light-text-primary text-dark-text-primary
							${m==="bottom"?"mt-1":"mb-1"}`,style:{bottom:m==="top"?"100%":void 0,top:m==="bottom"?"100%":void 0,left:"50%",transform:"translateX(-50%)"}},s))}t.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""}}};const V={title:"Components/Tooltip",component:t,argTypes:{title:{control:"text"}}},i={render:s=>e.createElement("div",{style:{padding:"50px"}},e.createElement(t,{...s},e.createElement(k,{size:"medium",type:"primary",state:"enabled",label:"Hover me",onClickButton:()=>{}}))),args:{title:"This is a tooltip"}},r={render:()=>e.createElement("div",{style:{padding:"50px"}},e.createElement(t,{title:"Settings"},e.createElement(n,{color:"tertiary",state:"enabled",size:"medium",iconName:"Settings"})))},a={render:()=>e.createElement("div",{style:{padding:"50px"}},e.createElement(t,{title:"This is a longer tooltip message that provides more context"},e.createElement(k,{size:"medium",type:"secondary",state:"enabled",label:"Hover for details",onClickButton:()=>{}})))},l={render:()=>e.createElement("div",{style:{display:"flex",gap:"16px",padding:"50px"}},e.createElement(t,{title:"Edit"},e.createElement(n,{color:"tertiary",state:"enabled",size:"medium",iconName:"Edit"})),e.createElement(t,{title:"Delete"},e.createElement(n,{color:"tertiary",state:"enabled",size:"medium",iconName:"Trash2"})),e.createElement(t,{title:"Share"},e.createElement(n,{color:"tertiary",state:"enabled",size:"medium",iconName:"Share"})),e.createElement(t,{title:"Download"},e.createElement(n,{color:"tertiary",state:"enabled",size:"medium",iconName:"Download"})))};var y,b,E;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <div style={{
    padding: "50px"
  }}>
      <Tooltip {...args}>
        <Button size="medium" type="primary" state="enabled" label="Hover me" onClickButton={() => {}} />
      </Tooltip>
    </div>,
  args: {
    title: "This is a tooltip"
  }
}`,...(E=(b=i.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var T,f,x;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "50px"
  }}>
      <Tooltip title="Settings">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Settings" />
      </Tooltip>
    </div>
}`,...(x=(f=r.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var v,h,B;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "50px"
  }}>
      <Tooltip title="This is a longer tooltip message that provides more context">
        <Button size="medium" type="secondary" state="enabled" label="Hover for details" onClickButton={() => {}} />
      </Tooltip>
    </div>
}`,...(B=(h=a.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var z,R,S;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px",
    padding: "50px"
  }}>
      <Tooltip title="Edit">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Edit" />
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Trash2" />
      </Tooltip>
      <Tooltip title="Share">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Share" />
      </Tooltip>
      <Tooltip title="Download">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Download" />
      </Tooltip>
    </div>
}`,...(S=(R=l.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};const X=["Default","OnIconButton","LongText","MultipleTooltips"];export{i as Default,a as LongText,l as MultipleTooltips,r as OnIconButton,X as __namedExportsOrder,V as default};
