import{R as e}from"./index-GiUgBvb1.js";import{M as a}from"./menuItem-BFI33Gcy.js";import"./iframe-B75O12d3.js";import"./link-BV4SGL2C.js";import"./app-router-context.shared-runtime-uhJskNH8.js";import"./jsx-runtime-CDt2p4po.js";import"./userImage-BwmgTY4g.js";import"./tag-t_KldOc1.js";import"./lucide-react-BvaQksD2.js";import"./circle-alert-7q9cGP-1.js";function r({children:d,className:u=""}){return e.createElement("nav",{className:`
        bg-light-background-default dark:bg-dark-background-default
        border-r border-light-misc-divider dark:border-dark-misc-divider
        p-[10px]
        ${u}
      `},d)}r.__docgenInfo={description:"",methods:[],displayName:"Navigation",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const f={title:"Components/Navigation",component:r},t={render:()=>e.createElement("div",{style:{height:"400px"}},e.createElement(r,null,e.createElement(a,{label:"Home",iconName:"Home",isSelected:!0}),e.createElement(a,{label:"Projects",iconName:"Folder"}),e.createElement(a,{label:"Team",iconName:"Users"}),e.createElement(a,{label:"Calendar",iconName:"Calendar"}),e.createElement(a,{label:"Settings",iconName:"Settings"})))},n={render:()=>e.createElement("div",{style:{height:"500px"}},e.createElement(r,null,e.createElement(a,{label:"Dashboard",iconName:"LayoutDashboard",isSelected:!0}),e.createElement(a,{label:"Projects",iconName:"Folder",iconRight:"ChevronRight"}),e.createElement(a,{label:"Tasks",iconName:"CheckSquare",tag:{label:"5"}}),e.createElement(a,{label:"Messages",iconName:"MessageSquare",tag:{label:"12"}}),e.createElement(a,{label:"Reports",iconName:"BarChart2"}),e.createElement(a,{label:"Settings",iconName:"Settings"})))};var l,o,i;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    height: "400px"
  }}>
      <Navigation>
        <MenuItem label="Home" iconName="Home" isSelected />
        <MenuItem label="Projects" iconName="Folder" />
        <MenuItem label="Team" iconName="Users" />
        <MenuItem label="Calendar" iconName="Calendar" />
        <MenuItem label="Settings" iconName="Settings" />
      </Navigation>
    </div>
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var s,m,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    height: "500px"
  }}>
      <Navigation>
        <MenuItem label="Dashboard" iconName="LayoutDashboard" isSelected />
        <MenuItem label="Projects" iconName="Folder" iconRight="ChevronRight" />
        <MenuItem label="Tasks" iconName="CheckSquare" tag={{
        label: "5"
      }} />
        <MenuItem label="Messages" iconName="MessageSquare" tag={{
        label: "12"
      }} />
        <MenuItem label="Reports" iconName="BarChart2" />
        <MenuItem label="Settings" iconName="Settings" />
      </Navigation>
    </div>
}`,...(c=(m=n.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const R=["Default","WithNestedItems"];export{t as Default,n as WithNestedItems,R as __namedExportsOrder,f as default};
