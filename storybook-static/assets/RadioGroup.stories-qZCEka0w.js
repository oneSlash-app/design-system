import{R as a,r as h}from"./index-GiUgBvb1.js";function s({options:e,selectedValue:t,onChange:i,direction:f="vertical"}){return a.createElement("div",{className:`flex ${f==="horizontal"?"space-x-4":"flex-col space-y-2"}`},e.map(r=>a.createElement("label",{key:r.value,className:"flex items-center cursor-pointer",onClick:()=>i(r.value)},a.createElement("div",{className:`relative flex justify-center items-center w-4 h-4 rounded-full border-2
              ${t===r.value?"border-light-text-primary dark:border-dark-text-primary":"border-light-text-secondary dark:border-dark-text-secondary"}
            `},t===r.value&&a.createElement("div",{className:"absolute w-2 h-2 rounded-full bg-light-text-primary dark:bg-dark-text-primary"})),a.createElement("span",{className:"ml-2 text-body1 text-light-text-primary dark:text-dark-text-primary"},r.label))))}s.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"RadioOption"}],raw:"RadioOption[]"},description:""},selectedValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}}}};const E={title:"Components/RadioGroup",component:s,argTypes:{direction:{control:"select",options:["horizontal","vertical"]}}},d=e=>{const[t,i]=h.useState(e.selectedValue||"option1");return a.createElement(s,{...e,selectedValue:t,onChange:i})},n={render:e=>a.createElement(d,{...e}),args:{options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}],selectedValue:"option1",direction:"vertical"}},l={render:e=>a.createElement(d,{...e}),args:{options:[{label:"Small",value:"small"},{label:"Medium",value:"medium"},{label:"Large",value:"large"}],selectedValue:"medium",direction:"horizontal"}},o={render:e=>a.createElement(d,{...e}),args:{options:[{label:"Credit Card",value:"credit"},{label:"PayPal",value:"paypal"},{label:"Bank Transfer",value:"bank"}],selectedValue:"credit",direction:"vertical"}};var c,p,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <RadioGroupWrapper {...args} />,
  args: {
    options: [{
      label: "Option 1",
      value: "option1"
    }, {
      label: "Option 2",
      value: "option2"
    }, {
      label: "Option 3",
      value: "option3"
    }],
    selectedValue: "option1",
    direction: "vertical"
  }
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,v,g;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <RadioGroupWrapper {...args} />,
  args: {
    options: [{
      label: "Small",
      value: "small"
    }, {
      label: "Medium",
      value: "medium"
    }, {
      label: "Large",
      value: "large"
    }],
    selectedValue: "medium",
    direction: "horizontal"
  }
}`,...(g=(v=l.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var b,y,x;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <RadioGroupWrapper {...args} />,
  args: {
    options: [{
      label: "Credit Card",
      value: "credit"
    }, {
      label: "PayPal",
      value: "paypal"
    }, {
      label: "Bank Transfer",
      value: "bank"
    }],
    selectedValue: "credit",
    direction: "vertical"
  }
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const O=["Vertical","Horizontal","PaymentOptions"];export{l as Horizontal,o as PaymentOptions,n as Vertical,O as __namedExportsOrder,E as default};
