import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as x}from"./index-EXTQMK5R.js";import{c as i}from"./cn-BLSKlp9E.js";const A=x(["relative w-full rounded-lg border p-4","[&>svg+div]:translate-y-[-3px]","[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground","[&>svg~*]:pl-7"],{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}});function o({className:t,variant:r,ref:s,...f}){return e.jsx("div",{ref:s,role:"alert","data-slot":"alert",className:i(A({variant:r}),t),...f})}function l({className:t,ref:r,...s}){return e.jsx("h5",{ref:r,"data-slot":"alert-title",className:i("mb-1 font-medium leading-none tracking-tight",t),...s})}function d({className:t,ref:r,...s}){return e.jsx("div",{ref:r,"data-slot":"alert-description",className:i("text-sm [&_p]:leading-relaxed",t),...s})}o.__docgenInfo={description:"",methods:[],displayName:"Alert"};l.__docgenInfo={description:"",methods:[],displayName:"AlertTitle"};d.__docgenInfo={description:"",methods:[],displayName:"AlertDescription"};const _={title:"Components/Alert",component:o,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive"]}}},a={args:{variant:"default"},render:t=>e.jsxs(o,{...t,children:[e.jsx(l,{children:"Heads up!"}),e.jsx(d,{children:"You can add components to your app using the cli."})]})},n={render:()=>e.jsxs(o,{variant:"destructive",children:[e.jsx(l,{children:"Error"}),e.jsx(d,{children:"Your session has expired. Please log in again."})]})};var c,u,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  },
  render: args => <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,g,v;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}`,...(v=(g=n.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const y=["Default","Destructive"];export{a as Default,n as Destructive,y as __namedExportsOrder,_ as default};
