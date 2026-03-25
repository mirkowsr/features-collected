import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as B}from"./index-ZH-6pyQh.js";import{P as O,c as R}from"./index-DiBV7ufl.js";import{u as V}from"./index-rGWUK6NW.js";import{c as H}from"./index-EXTQMK5R.js";import{c as M}from"./cn-BLSKlp9E.js";import{c as D}from"./createLucideIcon-Cb4HNAjX.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./index-Bo-loign.js";import"./index-B2_tsCGI.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=D("Bold",[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",key:"mg9rjx"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=D("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);var S="Toggle",E=B.forwardRef((e,d)=>{const{pressed:l,defaultPressed:c,onPressedChange:u,...z}=e,[g,N]=V({prop:l,onChange:u,defaultProp:c??!1,caller:S});return r.jsx(O.button,{type:"button","aria-pressed":g,"data-state":g?"on":"off","data-disabled":e.disabled?"":void 0,...z,ref:d,onClick:R(e.onClick,()=>{e.disabled||N(!g)})})});E.displayName=S;var A=E;const L=H(["inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium","transition-colors duration-[var(--transition-fast)]","hover:bg-muted hover:text-muted-foreground","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:pointer-events-none disabled:opacity-50","data-[state=on]:bg-accent data-[state=on]:text-accent-foreground","[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4"],{variants:{variant:{default:"bg-transparent",outline:"border border-border-strong bg-transparent hover:bg-accent hover:text-accent-foreground"},size:{sm:"h-8 px-2",default:"h-9 px-3",lg:"h-10 px-4"}},defaultVariants:{variant:"default",size:"default"}});function i({className:e,variant:d,size:l,ref:c,...u}){return r.jsx(A,{ref:c,"data-slot":"toggle",className:M(L({variant:d,size:l,className:e})),...u})}i.__docgenInfo={description:"",methods:[],displayName:"Toggle"};const re={title:"Components/Toggle",component:i,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","outline"]},size:{control:"select",options:["sm","default","lg"]}}},s={args:{children:"Toggle",defaultPressed:!1}},t={render:()=>r.jsx(i,{variant:"outline",children:r.jsx(W,{})})},a={render:()=>r.jsx(i,{children:r.jsx(w,{})})},o={args:{defaultPressed:!0,children:"Pressed"}},n={args:{disabled:!0,children:"Disabled"}};var m,p,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Toggle',
    defaultPressed: false
  }
}`,...(f=(p=s.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var b,v,x;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Toggle variant="outline">
      <Bold />
    </Toggle>
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var h,y,P;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Toggle>
      <Italic />
    </Toggle>
}`,...(P=(y=a.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var j,T,k;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultPressed: true,
    children: 'Pressed'
  }
}`,...(k=(T=o.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var I,_,C;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled'
  }
}`,...(C=(_=n.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};const se=["Default","Outline","WithIcon","Pressed","Disabled"];export{s as Default,n as Disabled,t as Outline,o as Pressed,a as WithIcon,se as __namedExportsOrder,re as default};
