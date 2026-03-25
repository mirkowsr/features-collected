import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{I as D}from"./input-o4jSbuNE.js";import"./cn-BLSKlp9E.js";const F={title:"Components/Input",component:D,tags:["autodocs"]},e={args:{placeholder:"Enter text..."}},r={render:()=>t.jsxs("div",{className:"flex flex-col gap-2",children:[t.jsx("label",{htmlFor:"email",className:"text-sm font-medium text-foreground",children:"Email"}),t.jsx(D,{id:"email",placeholder:"you@example.com"})]})},a={args:{disabled:!0,placeholder:"Disabled input"}},s={args:{type:"file"}},o={args:{type:"password",placeholder:"Password"}};var l,n,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(c=(n=e.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var d,m,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <label htmlFor="email" className="text-sm font-medium text-foreground">
        Email
      </label>
      <Input id="email" placeholder="you@example.com" />
    </div>
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var i,u,x;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input'
  }
}`,...(x=(u=a.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,f,h;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: 'file'
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var b,w,y;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Password'
  }
}`,...(y=(w=o.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};const I=["Default","WithLabel","Disabled","File","Password"];export{e as Default,a as Disabled,s as File,o as Password,r as WithLabel,I as __namedExportsOrder,F as default};
