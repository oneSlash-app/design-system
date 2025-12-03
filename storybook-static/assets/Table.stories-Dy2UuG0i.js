import{R as e}from"./index-GiUgBvb1.js";function d({children:n}){return e.createElement("div",{className:"w-full overflow-x-auto bg-light-background-default dark:bg-dark-background-default"},n)}d.__docgenInfo={description:"",methods:[],displayName:"TableContainer",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function m({children:n}){return e.createElement("div",{className:"py-2 bg-light-background-default dark:bg-dark-background-default"},n)}m.__docgenInfo={description:"",methods:[],displayName:"TableHeader",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function a({children:n,width:r,minWidth:b,align:i="left"}){const T=i==="center"?"text-center":i==="right"?"text-right":"text-left",p=r?{width:r,minWidth:b||r}:{},g=r?"":"flex-1";return e.createElement("div",{className:`${g} p-2 text-body2 text-light-text-primary dark:text-dark-text-primary ${T}`,style:p},n)}a.__docgenInfo={description:"",methods:[],displayName:"TableHeaderCell",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},width:{required:!1,tsType:{name:"string"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:""},align:{required:!1,tsType:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}}}};function t({children:n}){return e.createElement("div",{className:"flex w-full"},n)}t.__docgenInfo={description:"",methods:[],displayName:"TableRow",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function l({children:n,width:r,minWidth:b,align:i="left"}){const T=i==="center"?"text-center":i==="right"?"text-right":"text-left",p=r?{width:r,minWidth:b||r}:{},g=r?"":"flex-1";return e.createElement("div",{className:`${g} p-2 text-body2 text-light-text-primary dark:text-dark-text-primary border-t border-light-misc-divider dark:border-dark-misc-divider ${T}`,style:p},n)}l.__docgenInfo={description:"",methods:[],displayName:"TableCell",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},width:{required:!1,tsType:{name:"string"},description:""},minWidth:{required:!1,tsType:{name:"string"},description:""},align:{required:!1,tsType:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}}}};const N={title:"Components/Table",component:d},c={render:()=>e.createElement(d,null,e.createElement(m,null,e.createElement(t,null,e.createElement(a,{width:"200px"},"Name"),e.createElement(a,{width:"150px"},"Status"),e.createElement(a,{width:"150px",align:"right"},"Amount"))),e.createElement(t,null,e.createElement(l,{width:"200px"},"John Doe"),e.createElement(l,{width:"150px"},"Active"),e.createElement(l,{width:"150px",align:"right"},"$1,234.00")),e.createElement(t,null,e.createElement(l,{width:"200px"},"Jane Smith"),e.createElement(l,{width:"150px"},"Pending"),e.createElement(l,{width:"150px",align:"right"},"$567.89")),e.createElement(t,null,e.createElement(l,{width:"200px"},"Bob Johnson"),e.createElement(l,{width:"150px"},"Inactive"),e.createElement(l,{width:"150px",align:"right"},"$0.00")))},o={render:()=>e.createElement(d,null,e.createElement(m,null,e.createElement(t,null,e.createElement(a,null,"Description"),e.createElement(a,{width:"100px",align:"center"},"Qty"),e.createElement(a,{width:"120px",align:"right"},"Price"))),e.createElement(t,null,e.createElement(l,null,"Product A - Premium Widget"),e.createElement(l,{width:"100px",align:"center"},"5"),e.createElement(l,{width:"120px",align:"right"},"$49.99")),e.createElement(t,null,e.createElement(l,null,"Product B - Standard Widget with extended description"),e.createElement(l,{width:"100px",align:"center"},"10"),e.createElement(l,{width:"120px",align:"right"},"$29.99")),e.createElement(t,null,e.createElement(l,null,"Product C - Basic"),e.createElement(l,{width:"100px",align:"center"},"3"),e.createElement(l,{width:"120px",align:"right"},"$9.99")))},s={render:()=>e.createElement(d,null,e.createElement(m,null,e.createElement(t,null,e.createElement(a,{align:"center"},"ID"),e.createElement(a,{align:"center"},"Status"),e.createElement(a,{align:"center"},"Date"))),e.createElement(t,null,e.createElement(l,{align:"center"},"#001"),e.createElement(l,{align:"center"},"Completed"),e.createElement(l,{align:"center"},"2024-01-15")),e.createElement(t,null,e.createElement(l,{align:"center"},"#002"),e.createElement(l,{align:"center"},"In Progress"),e.createElement(l,{align:"center"},"2024-01-16")))};var u,h,C;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell width="200px">Name</TableHeaderCell>
          <TableHeaderCell width="150px">Status</TableHeaderCell>
          <TableHeaderCell width="150px" align="right">Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableRow>
        <TableCell width="200px">John Doe</TableCell>
        <TableCell width="150px">Active</TableCell>
        <TableCell width="150px" align="right">$1,234.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell width="200px">Jane Smith</TableCell>
        <TableCell width="150px">Pending</TableCell>
        <TableCell width="150px" align="right">$567.89</TableCell>
      </TableRow>
      <TableRow>
        <TableCell width="200px">Bob Johnson</TableCell>
        <TableCell width="150px">Inactive</TableCell>
        <TableCell width="150px" align="right">$0.00</TableCell>
      </TableRow>
    </TableContainer>
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var w,x,E;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell width="100px" align="center">Qty</TableHeaderCell>
          <TableHeaderCell width="120px" align="right">Price</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableRow>
        <TableCell>Product A - Premium Widget</TableCell>
        <TableCell width="100px" align="center">5</TableCell>
        <TableCell width="120px" align="right">$49.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Product B - Standard Widget with extended description</TableCell>
        <TableCell width="100px" align="center">10</TableCell>
        <TableCell width="120px" align="right">$29.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Product C - Basic</TableCell>
        <TableCell width="100px" align="center">3</TableCell>
        <TableCell width="120px" align="right">$9.99</TableCell>
      </TableRow>
    </TableContainer>
}`,...(E=(x=o.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var f,R,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell align="center">ID</TableHeaderCell>
          <TableHeaderCell align="center">Status</TableHeaderCell>
          <TableHeaderCell align="center">Date</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableRow>
        <TableCell align="center">#001</TableCell>
        <TableCell align="center">Completed</TableCell>
        <TableCell align="center">2024-01-15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">#002</TableCell>
        <TableCell align="center">In Progress</TableCell>
        <TableCell align="center">2024-01-16</TableCell>
      </TableRow>
    </TableContainer>
}`,...(y=(R=s.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};const v=["Default","FlexibleWidth","CenteredContent"];export{s as CenteredContent,c as Default,o as FlexibleWidth,v as __namedExportsOrder,N as default};
