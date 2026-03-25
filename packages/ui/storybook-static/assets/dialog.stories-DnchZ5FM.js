import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as n}from"./button-CbqPgvQy.js";import{I as l}from"./input-o4jSbuNE.js";import{L as d}from"./label-ybmONEYr.js";import{R as j,P as y,C as v,a as b,T as _,b as C,D as I,O as T}from"./index-7PwWU_aB.js";import{c as i}from"./cn-BLSKlp9E.js";import{X as F}from"./x-COQzl7Au.js";import"./index-ZW2Bszwo.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Bo-loign.js";import"./index-EXTQMK5R.js";import"./index-CFwX3euR.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./index-DiBV7ufl.js";import"./index-DhX5pgku.js";import"./index-CBQcSsvu.js";import"./index-B2_tsCGI.js";import"./index-rGWUK6NW.js";import"./index-a_BF7M2Z.js";import"./index-BzHRfv9E.js";import"./index-DXJBDT4j.js";import"./index-BlNWsJ36.js";import"./createLucideIcon-Cb4HNAjX.js";const w=j,P=y;function p({className:a,ref:t,...o}){return e.jsx(_,{ref:t,"data-slot":"dialog-trigger",className:i(a),...o})}function u({className:a,ref:t,...o}){return e.jsx(T,{ref:t,"data-slot":"dialog-overlay",className:i("fixed inset-0 z-50 bg-overlay","data-[state=open]:opacity-100 data-[state=closed]:opacity-0","transition-opacity duration-200",a),...o})}function r({className:a,children:t,ref:o,...N}){return e.jsxs(P,{children:[e.jsx(u,{}),e.jsxs(v,{ref:o,"data-slot":"dialog-content",className:i("fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2","gap-4 border border-border bg-surface p-6 shadow-lg","rounded-lg","transition-all duration-200","data-[state=open]:opacity-100 data-[state=open]:scale-100","data-[state=closed]:opacity-0 data-[state=closed]:scale-95",a),...N,children:[t,e.jsxs(b,{"data-slot":"dialog-content-close",className:i("absolute right-4 top-4 rounded-sm opacity-70","transition-opacity hover:opacity-100","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:pointer-events-none"),children:[e.jsx(F,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function f({className:a,ref:t,...o}){return e.jsx("div",{ref:t,"data-slot":"dialog-header",className:i("flex flex-col gap-2 text-center sm:text-left",a),...o})}function x({className:a,ref:t,...o}){return e.jsx("div",{ref:t,"data-slot":"dialog-footer",className:i("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",a),...o})}function h({className:a,ref:t,...o}){return e.jsx(C,{ref:t,"data-slot":"dialog-title",className:i("text-lg font-semibold leading-none tracking-tight",a),...o})}function D({className:a,ref:t,...o}){return e.jsx(I,{ref:t,"data-slot":"dialog-description",className:i("text-sm text-muted-foreground",a),...o})}u.__docgenInfo={description:"",methods:[],displayName:"DialogOverlay"};p.__docgenInfo={description:"",methods:[],displayName:"DialogTrigger"};r.__docgenInfo={description:"",methods:[],displayName:"DialogContent"};f.__docgenInfo={description:"",methods:[],displayName:"DialogHeader"};x.__docgenInfo={description:"",methods:[],displayName:"DialogFooter"};h.__docgenInfo={description:"",methods:[],displayName:"DialogTitle"};D.__docgenInfo={description:"",methods:[],displayName:"DialogDescription"};const te={title:"Components/Dialog",component:r,tags:["autodocs"]},s={render:a=>e.jsxs(w,{children:[e.jsx(p,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Edit Profile"})}),e.jsxs(r,{...a,children:[e.jsxs(f,{children:[e.jsx(h,{children:"Edit profile"}),e.jsx(D,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(d,{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx(l,{id:"name",defaultValue:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(d,{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx(l,{id:"username",defaultValue:"@peduarte",className:"col-span-3"})]})]}),e.jsx(x,{children:e.jsx(n,{type:"submit",children:"Save changes"})})]})]})};var c,m,g;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const oe=["Default"];export{s as Default,oe as __namedExportsOrder,te as default};
