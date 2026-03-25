import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as l}from"./button-CbqPgvQy.js";import{I as p}from"./input-o4jSbuNE.js";import{L as u}from"./label-ybmONEYr.js";import{R as I,P as w,C as B,a as v,T as F,b as O,D as V,O as k}from"./index-7PwWU_aB.js";import{c as H}from"./index-EXTQMK5R.js";import{c as o}from"./cn-BLSKlp9E.js";import{X as L}from"./x-COQzl7Au.js";import"./index-ZW2Bszwo.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Bo-loign.js";import"./index-CFwX3euR.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./index-DiBV7ufl.js";import"./index-DhX5pgku.js";import"./index-CBQcSsvu.js";import"./index-B2_tsCGI.js";import"./index-rGWUK6NW.js";import"./index-a_BF7M2Z.js";import"./index-BzHRfv9E.js";import"./index-DXJBDT4j.js";import"./index-BlNWsJ36.js";import"./createLucideIcon-Cb4HNAjX.js";const N=I,P=w;function d({className:t,ref:s,...r}){return e.jsx(F,{ref:s,"data-slot":"sheet-trigger",className:o(t),...r})}function y({className:t,ref:s,...r}){return e.jsx(v,{ref:s,"data-slot":"sheet-close",className:o(t),...r})}function C({className:t,ref:s,...r}){return e.jsx(k,{ref:s,"data-slot":"sheet-overlay",className:o("fixed inset-0 z-50 bg-overlay","data-[state=open]:opacity-100 data-[state=closed]:opacity-0","transition-opacity duration-200",t),...r})}const E=H(o("fixed z-50 gap-4 bg-surface p-6 shadow-lg","transition-transform duration-300 ease-out"),{variants:{side:{top:"inset-x-0 top-0 border-b border-border",bottom:"inset-x-0 bottom-0 border-t border-border",left:"inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm"}},defaultVariants:{side:"right"}});function n({side:t="right",className:s,children:r,ref:_,...D}){return e.jsxs(P,{children:[e.jsx(C,{}),e.jsxs(B,{ref:_,"data-slot":"sheet-content",className:o(E({side:t}),"data-[state=closed]:opacity-0 data-[state=open]:opacity-100",s),...D,children:[e.jsxs(v,{"data-slot":"sheet-content-close",className:o("absolute right-4 top-4 rounded-sm opacity-70","transition-opacity hover:opacity-100","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:pointer-events-none"),children:[e.jsx(L,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:"Close"})]}),r]})]})}function c({className:t,ref:s,...r}){return e.jsx("div",{ref:s,"data-slot":"sheet-header",className:o("flex flex-col gap-2 text-center sm:text-left",t),...r})}function T({className:t,ref:s,...r}){return e.jsx("div",{ref:s,"data-slot":"sheet-footer",className:o("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",t),...r})}function h({className:t,ref:s,...r}){return e.jsx(O,{ref:s,"data-slot":"sheet-title",className:o("text-lg font-semibold text-foreground",t),...r})}function m({className:t,ref:s,...r}){return e.jsx(V,{ref:s,"data-slot":"sheet-description",className:o("text-sm text-muted-foreground",t),...r})}C.__docgenInfo={description:"",methods:[],displayName:"SheetOverlay"};d.__docgenInfo={description:"",methods:[],displayName:"SheetTrigger"};y.__docgenInfo={description:"",methods:[],displayName:"SheetClose"};n.__docgenInfo={description:"",methods:[],displayName:"SheetContent",props:{side:{defaultValue:{value:"'right'",computed:!1},required:!1}}};c.__docgenInfo={description:"",methods:[],displayName:"SheetHeader"};T.__docgenInfo={description:"",methods:[],displayName:"SheetFooter"};h.__docgenInfo={description:"",methods:[],displayName:"SheetTitle"};m.__docgenInfo={description:"",methods:[],displayName:"SheetDescription"};const ce={title:"Components/Sheet",component:n,tags:["autodocs"]},a={args:{side:"right"},argTypes:{side:{control:"select",options:["top","right","bottom","left"]}},render:t=>e.jsxs(N,{children:[e.jsx(d,{asChild:!0,children:e.jsx(l,{variant:"outline",children:"Open Sheet"})}),e.jsxs(n,{...t,children:[e.jsxs(c,{children:[e.jsx(h,{children:"Edit profile"}),e.jsx(m,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(u,{htmlFor:"sheet-name",className:"text-right",children:"Name"}),e.jsx(p,{id:"sheet-name",defaultValue:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(u,{htmlFor:"sheet-username",className:"text-right",children:"Username"}),e.jsx(p,{id:"sheet-username",defaultValue:"@peduarte",className:"col-span-3"})]})]}),e.jsx(T,{children:e.jsx(y,{asChild:!0,children:e.jsx(l,{type:"submit",children:"Save changes"})})})]})]})},i={render:()=>e.jsx("div",{className:"flex gap-4",children:["top","right","bottom","left"].map(t=>e.jsxs(N,{children:[e.jsx(d,{asChild:!0,children:e.jsx(l,{variant:"outline",children:t})}),e.jsx(n,{side:t,children:e.jsxs(c,{children:[e.jsxs(h,{children:["Sheet from ",t]}),e.jsxs(m,{children:["This sheet slides in from the ",t,"."]})]})})]},t))})};var g,f,x;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    side: 'right'
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    }
  },
  render: args => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sheet-name" className="text-right">Name</Label>
            <Input id="sheet-name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sheet-username" className="text-right">Username</Label>
            <Input id="sheet-username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var S,j,b;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Sheet from {side}</SheetTitle>
              <SheetDescription>This sheet slides in from the {side}.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>)}
    </div>
}`,...(b=(j=i.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};const he=["Default","Sides"];export{a as Default,i as Sides,he as __namedExportsOrder,ce as default};
