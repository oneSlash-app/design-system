import{R as e}from"./index-GiUgBvb1.js";function i({createdAt:h,dateFormat:ue,textSize:z="small",textColor:ge="secondary",data:u="date-and-time"}){const pe=ue==="absolute"?(D=>{const o=new Date(D),w=(o.getMonth()+1).toString().padStart(2,"0"),F=o.getDate().toString().padStart(2,"0"),l=o.getFullYear(),a=o.getHours(),r=o.getMinutes(),t=a.toString().padStart(2,"0"),n=r.toString().padStart(2,"0"),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][o.getDay()],R=`${w}/${F}/${l} ${s}`,k=`${t}:${n}`;return u==="date"?R:u==="time"?k:`${R} ${k}`})(h):(D=>{const o=new Date(D),F=new Date().getTime()-o.getTime(),l=Math.floor(F/1e3),a=Math.floor(l/60),r=Math.floor(a/60),t=Math.floor(r/24),n=Math.floor(t/7),d=Math.floor(t/30),s=Math.floor(t/365);return u==="date"?s>0?`${s} year${s>1?"s":""} ago`:d>0?`${d} month${d>1?"s":""} ago`:n>0?`${n} week${n>1?"s":""} ago`:t>0?`${t} day${t>1?"s":""} ago`:"today":u==="time"?r>0?`${r} hour${r>1?"s":""} ago`:a>0?`${a} minute${a>1?"s":""} ago`:`${l} second${l>1?"s":""} ago`:s>0?`${s} year${s>1?"s":""} ago`:d>0?`${d} month${d>1?"s":""} ago`:n>0?`${n} week${n>1?"s":""} ago`:t>0?`${t} day${t>1?"s":""} ago`:r>0?`${r} hour${r>1?"s":""} ago`:a>0?`${a} minute${a>1?"s":""} ago`:`${l} second${l>1?"s":""} ago`})(h),ye=z==="medium"?"text-body2":z==="large"?"text-body1":"text-caption",xe=ge==="primary"?"text-light-text-primary dark:text-dark-text-primary":"text-light-text-secondary dark:text-dark-text-secondary";return e.createElement("p",{className:`${ye} ${xe}`},pe)}i.__docgenInfo={description:"",methods:[],displayName:"TimeStamp",props:{createdAt:{required:!0,tsType:{name:"union",raw:"string | number | Date",elements:[{name:"string"},{name:"number"},{name:"Date"}]},description:""},dateFormat:{required:!0,tsType:{name:"union",raw:"'absolute' | 'relative'",elements:[{name:"literal",value:"'absolute'"},{name:"literal",value:"'relative'"}]},description:""},textSize:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'small'",computed:!1}},textColor:{required:!1,tsType:{name:"union",raw:"'secondary' | 'primary'",elements:[{name:"literal",value:"'secondary'"},{name:"literal",value:"'primary'"}]},description:"",defaultValue:{value:"'secondary'",computed:!1}},data:{required:!1,tsType:{name:"union",raw:"'date-and-time' | 'date' | 'time'",elements:[{name:"literal",value:"'date-and-time'"},{name:"literal",value:"'date'"},{name:"literal",value:"'time'"}]},description:"",defaultValue:{value:"'date-and-time'",computed:!1}}}};const $e={title:"Components/TimeStamp",component:i,argTypes:{dateFormat:{control:"select",options:["absolute","relative"]},textSize:{control:"select",options:["small","medium","large"]},textColor:{control:"select",options:["secondary","primary"]},data:{control:"select",options:["date-and-time","date","time"]}}},c=new Date,C=new Date(c.getTime()-60*60*1e3),m=new Date(c.getTime()-24*60*60*1e3),ce=new Date(c.getTime()-7*24*60*60*1e3),Ae=new Date(c.getTime()-30*24*60*60*1e3),g={args:{createdAt:m,dateFormat:"absolute",textSize:"small",textColor:"secondary",data:"date-and-time"}},p={args:{createdAt:ce,dateFormat:"absolute",textSize:"small",textColor:"secondary",data:"date"}},y={args:{createdAt:C,dateFormat:"absolute",textSize:"small",textColor:"secondary",data:"time"}},x={args:{createdAt:new Date(c.getTime()-5*60*1e3),dateFormat:"relative",textSize:"small",textColor:"secondary",data:"date-and-time"}},A={args:{createdAt:C,dateFormat:"relative",textSize:"small",textColor:"secondary",data:"date-and-time"}},v={args:{createdAt:m,dateFormat:"relative",textSize:"small",textColor:"secondary",data:"date-and-time"}},S={args:{createdAt:ce,dateFormat:"relative",textSize:"small",textColor:"secondary",data:"date-and-time"}},f={args:{createdAt:Ae,dateFormat:"relative",textSize:"small",textColor:"secondary",data:"date-and-time"}},$={args:{createdAt:m,dateFormat:"relative",textSize:"medium",textColor:"primary",data:"date-and-time"}},b={args:{createdAt:m,dateFormat:"absolute",textSize:"large",textColor:"primary",data:"date-and-time"}},T={render:()=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},e.createElement("div",null,e.createElement("strong",null,"Absolute - Date and Time:"),e.createElement(i,{createdAt:m,dateFormat:"absolute",data:"date-and-time"})),e.createElement("div",null,e.createElement("strong",null,"Absolute - Date only:"),e.createElement(i,{createdAt:m,dateFormat:"absolute",data:"date"})),e.createElement("div",null,e.createElement("strong",null,"Absolute - Time only:"),e.createElement(i,{createdAt:C,dateFormat:"absolute",data:"time"})),e.createElement("div",null,e.createElement("strong",null,"Relative:"),e.createElement(i,{createdAt:m,dateFormat:"relative",data:"date-and-time"})))};var E,M,W;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    createdAt: oneDayAgo,
    dateFormat: "absolute",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time"
  }
}`,...(W=(M=g.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var H,O,q;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    createdAt: oneWeekAgo,
    dateFormat: "absolute",
    textSize: "small",
    textColor: "secondary",
    data: "date"
  }
}`,...(q=(O=p.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var _,V,L;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    createdAt: oneHourAgo,
    dateFormat: "absolute",
    textSize: "small",
    textColor: "secondary",
    data: "time"
  }
}`,...(L=(V=y.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var N,P,I;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    createdAt: new Date(now.getTime() - 5 * 60 * 1000),
    // 5 minutes ago
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time"
  }
}`,...(I=(P=x.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var Y,j,B;A.parameters={...A.parameters,docs:{...(Y=A.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    createdAt: oneHourAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time"
  }
}`,...(B=(j=A.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var G,J,K;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    createdAt: oneDayAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time"
  }
}`,...(K=(J=v.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    createdAt: oneWeekAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time"
  }
}`,...(X=(U=S.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Z,ee,te;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    createdAt: oneMonthAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time"
  }
}`,...(te=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,re,oe;$.parameters={...$.parameters,docs:{...(ae=$.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    createdAt: oneDayAgo,
    dateFormat: "relative",
    textSize: "medium",
    textColor: "primary",
    data: "date-and-time"
  }
}`,...(oe=(re=$.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ne,se,le;b.parameters={...b.parameters,docs:{...(ne=b.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    createdAt: oneDayAgo,
    dateFormat: "absolute",
    textSize: "large",
    textColor: "primary",
    data: "date-and-time"
  }
}`,...(le=(se=b.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var de,me,ie;T.parameters={...T.parameters,docs:{...(de=T.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
      <div>
        <strong>Absolute - Date and Time:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="absolute" data="date-and-time" />
      </div>
      <div>
        <strong>Absolute - Date only:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="absolute" data="date" />
      </div>
      <div>
        <strong>Absolute - Time only:</strong>
        <TimeStamp createdAt={oneHourAgo} dateFormat="absolute" data="time" />
      </div>
      <div>
        <strong>Relative:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="relative" data="date-and-time" />
      </div>
    </div>
}`,...(ie=(me=T.parameters)==null?void 0:me.docs)==null?void 0:ie.source}}};const be=["AbsoluteDateAndTime","AbsoluteDateOnly","AbsoluteTimeOnly","RelativeRecent","RelativeHours","RelativeDays","RelativeWeeks","RelativeMonths","PrimaryColor","LargeSize","AllFormats"];export{g as AbsoluteDateAndTime,p as AbsoluteDateOnly,y as AbsoluteTimeOnly,T as AllFormats,b as LargeSize,$ as PrimaryColor,v as RelativeDays,A as RelativeHours,f as RelativeMonths,x as RelativeRecent,S as RelativeWeeks,be as __namedExportsOrder,$e as default};
