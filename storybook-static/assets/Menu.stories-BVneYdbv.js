import{R as e}from"./index-GiUgBvb1.js";import{M as s}from"./menu-RlRmVxTA.js";import{M as a}from"./menuItem-BFI33Gcy.js";import"./iframe-B75O12d3.js";import"./link-BV4SGL2C.js";import"./app-router-context.shared-runtime-uhJskNH8.js";import"./jsx-runtime-CDt2p4po.js";import"./userImage-BwmgTY4g.js";import"./tag-t_KldOc1.js";import"./lucide-react-BvaQksD2.js";import"./circle-alert-7q9cGP-1.js";const L={title:"Components/Menu",component:s,argTypes:{width:{control:"text"}}},n={render:t=>e.createElement(s,{...t},e.createElement(a,{label:"Profile",iconName:"User"}),e.createElement(a,{label:"Settings",iconName:"Settings"}),e.createElement(a,{label:"Logout",iconName:"LogOut"})),args:{width:200}},r={render:t=>e.createElement(s,{...t},e.createElement(a,{label:"Dashboard",iconName:"Home"}),e.createElement(a,{label:"Projects",iconName:"Folder",isSelected:!0}),e.createElement(a,{label:"Team",iconName:"Users"}),e.createElement(a,{label:"Settings",iconName:"Settings"})),args:{width:200}},o={render:t=>e.createElement(s,{...t},e.createElement(a,{label:"Inbox",iconName:"Mail",tag:{label:"12"}}),e.createElement(a,{label:"Notifications",iconName:"Bell",tag:{label:"New"}}),e.createElement(a,{label:"Messages",iconName:"MessageSquare"})),args:{width:220}};var l,m,i;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem label="Profile" iconName="User" />
      <MenuItem label="Settings" iconName="Settings" />
      <MenuItem label="Logout" iconName="LogOut" />
    </Menu>,
  args: {
    width: 200
  }
}`,...(i=(m=n.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var c,g,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem label="Dashboard" iconName="Home" />
      <MenuItem label="Projects" iconName="Folder" isSelected />
      <MenuItem label="Team" iconName="Users" />
      <MenuItem label="Settings" iconName="Settings" />
    </Menu>,
  args: {
    width: 200
  }
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var d,b,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem label="Inbox" iconName="Mail" tag={{
      label: "12"
    }} />
      <MenuItem label="Notifications" iconName="Bell" tag={{
      label: "New"
    }} />
      <MenuItem label="Messages" iconName="MessageSquare" />
    </Menu>,
  args: {
    width: 220
  }
}`,...(p=(b=o.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};const P=["Default","WithSelectedItem","WithTags"];export{n as Default,r as WithSelectedItem,o as WithTags,P as __namedExportsOrder,L as default};
