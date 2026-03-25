import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as t}from"./button-CbqPgvQy.js";import{c as y}from"./createLucideIcon-Cb4HNAjX.js";import"./index-ZW2Bszwo.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Bo-loign.js";import"./index-EXTQMK5R.js";import"./cn-BLSKlp9E.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=y("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),W={title:"Components/Button",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","outline","ghost","destructive","link"]},size:{control:"select",options:["sm","default","lg","icon"]}}},r={args:{children:"Button"}},n={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(t,{variant:"default",children:"Default"}),e.jsx(t,{variant:"secondary",children:"Secondary"}),e.jsx(t,{variant:"outline",children:"Outline"}),e.jsx(t,{variant:"ghost",children:"Ghost"}),e.jsx(t,{variant:"destructive",children:"Destructive"}),e.jsx(t,{variant:"link",children:"Link"})]})},s={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(t,{size:"sm",children:"Small"}),e.jsx(t,{size:"default",children:"Default"}),e.jsx(t,{size:"lg",children:"Large"})]})},a={args:{children:"Disabled",disabled:!0}},o={render:()=>e.jsxs(t,{children:["Next",e.jsx(L,{})]})},i={render:()=>e.jsx(t,{asChild:!0,children:e.jsx("a",{href:"https://example.com",children:"Link as Button"})})};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,m,p;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var h,B,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...(g=(B=s.parameters)==null?void 0:B.docs)==null?void 0:g.source}}};var v,x,f;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Disabled',
    disabled: true
  }
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var j,D,S;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Button>
      Next
      <ChevronRight />
    </Button>
}`,...(S=(D=o.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var z,k,C;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Button asChild>
      <a href="https://example.com">Link as Button</a>
    </Button>
}`,...(C=(k=i.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};const _=["Default","AllVariants","AllSizes","Disabled","WithIcon","AsChild"];export{s as AllSizes,n as AllVariants,i as AsChild,r as Default,a as Disabled,o as WithIcon,_ as __namedExportsOrder,W as default};
