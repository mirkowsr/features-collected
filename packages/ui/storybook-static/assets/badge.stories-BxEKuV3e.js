import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as b}from"./index-EXTQMK5R.js";import{c as y}from"./cn-BLSKlp9E.js";const B=b("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground",secondary:"border-border bg-secondary text-secondary-foreground",outline:"border-border-strong text-foreground",destructive:"border-transparent bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}});function r({className:m,variant:p,ref:f,...x}){return e.jsx("span",{"data-slot":"badge",ref:f,className:y(B({variant:p,className:m})),...x})}r.__docgenInfo={description:"",methods:[],displayName:"Badge"};const S={title:"Components/Badge",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","outline","destructive"]}}},a={args:{children:"Badge"}},t={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(r,{variant:"default",children:"Default"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"destructive",children:"Destructive"})]})},s={args:{variant:"destructive",children:"Destructive"}};var n,o,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(i=(o=a.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var d,c,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var l,g,v;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Destructive'
  }
}`,...(v=(g=s.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const N=["Default","AllVariants","Destructive"];export{t as AllVariants,a as Default,s as Destructive,N as __namedExportsOrder,S as default};
