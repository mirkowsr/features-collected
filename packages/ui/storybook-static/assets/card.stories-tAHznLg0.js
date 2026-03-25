import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as o}from"./cn-BLSKlp9E.js";function n({className:r,ref:t,...a}){return e.jsx("div",{ref:t,"data-slot":"card",className:o("bg-surface text-surface-foreground","border border-border rounded-lg shadow-sm",r),...a})}function u({className:r,ref:t,...a}){return e.jsx("div",{ref:t,"data-slot":"card-header",className:o("flex flex-col gap-1.5 p-6",r),...a})}function f({className:r,ref:t,...a}){return e.jsx("h3",{ref:t,"data-slot":"card-title",className:o("text-lg font-semibold leading-none tracking-tight",r),...a})}function h({className:r,ref:t,...a}){return e.jsx("p",{ref:t,"data-slot":"card-description",className:o("text-sm text-muted-foreground",r),...a})}function c({className:r,ref:t,...a}){return e.jsx("div",{ref:t,"data-slot":"card-content",className:o("p-6 pt-0",r),...a})}function g({className:r,ref:t,...a}){return e.jsx("div",{ref:t,"data-slot":"card-footer",className:o("flex items-center p-6 pt-0",r),...a})}n.__docgenInfo={description:"",methods:[],displayName:"Card"};u.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};f.__docgenInfo={description:"",methods:[],displayName:"CardTitle"};h.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};c.__docgenInfo={description:"",methods:[],displayName:"CardContent"};g.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};const _={title:"Components/Card",component:n,tags:["autodocs"]},s={args:{className:"w-[350px]"},render:r=>e.jsxs(n,{...r,children:[e.jsxs(u,{children:[e.jsx(f,{children:"Card Title"}),e.jsx(h,{children:"Card description text."})]}),e.jsx(c,{children:e.jsx("p",{children:"Your content goes here. This is an example of a fully composed card with header, content, and footer sections working together."})}),e.jsx(g,{children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"Card footer"})})]})},d={render:()=>e.jsx(n,{className:"w-[350px]",children:e.jsx(c,{className:"pt-6",children:e.jsx("p",{children:"A simple card with only content inside."})})})};var i,l,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    className: 'w-[350px]'
  },
  render: args => <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Your content goes here. This is an example of a fully composed card with header, content,
          and footer sections working together.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
}`,...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var m,C,x;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with only content inside.</p>
      </CardContent>
    </Card>
}`,...(x=(C=d.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};const w=["Default","Simple"];export{s as Default,d as Simple,w as __namedExportsOrder,_ as default};
