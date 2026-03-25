import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-ZH-6pyQh.js";import{P as I,c as w}from"./index-DiBV7ufl.js";import{u as _}from"./index-Bo-loign.js";import{a as S}from"./index-DhX5pgku.js";import{R as Y,I as J,c as A}from"./index-B72zH5le.js";import{u as Q}from"./index-rGWUK6NW.js";import{u as Z}from"./index-BH6b-3aW.js";import{u as ee}from"./index-DFrgnYfK.js";import{u as oe}from"./index-CYU-ZmrK.js";import{P as re}from"./index-BlNWsJ36.js";import{c as D}from"./cn-BLSKlp9E.js";import{c as te}from"./createLucideIcon-Cb4HNAjX.js";import{L as g}from"./label-ybmONEYr.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./index-SuQ8WfE6.js";import"./index-CBQcSsvu.js";import"./index-B2_tsCGI.js";import"./index-BzHRfv9E.js";import"./index-CFwX3euR.js";import"./index-ZW2Bszwo.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=te("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);var C="Radio",[ie,T]=S(C),[se,ne]=ie(C),M=d.forwardRef((r,a)=>{const{__scopeRadio:o,name:c,checked:t=!1,required:i,disabled:n,value:m="on",onCheck:l,form:f,...v}=r,[u,R]=d.useState(null),s=_(a,h=>R(h)),p=d.useRef(!1),x=u?f||!!u.closest("form"):!0;return e.jsxs(se,{scope:o,checked:t,disabled:n,children:[e.jsx(I.button,{type:"button",role:"radio","aria-checked":t,"data-state":K(t),"data-disabled":n?"":void 0,disabled:n,value:m,...v,ref:s,onClick:w(r.onClick,h=>{t||l==null||l(),x&&(p.current=h.isPropagationStopped(),p.current||h.stopPropagation())})}),x&&e.jsx(B,{control:u,bubbles:!p.current,name:c,value:m,checked:t,required:i,disabled:n,form:f,style:{transform:"translateX(-100%)"}})]})});M.displayName=C;var V="RadioIndicator",q=d.forwardRef((r,a)=>{const{__scopeRadio:o,forceMount:c,...t}=r,i=ne(V,o);return e.jsx(re,{present:c||i.checked,children:e.jsx(I.span,{"data-state":K(i.checked),"data-disabled":i.disabled?"":void 0,...t,ref:a})})});q.displayName=V;var de="RadioBubbleInput",B=d.forwardRef(({__scopeRadio:r,control:a,checked:o,bubbles:c=!0,...t},i)=>{const n=d.useRef(null),m=_(n,i),l=oe(o),f=ee(a);return d.useEffect(()=>{const v=n.current;if(!v)return;const u=window.HTMLInputElement.prototype,s=Object.getOwnPropertyDescriptor(u,"checked").set;if(l!==o&&s){const p=new Event("click",{bubbles:c});s.call(v,o),v.dispatchEvent(p)}},[l,o,c]),e.jsx(I.input,{type:"radio","aria-hidden":!0,defaultChecked:o,...t,tabIndex:-1,ref:m,style:{...t.style,...f,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});B.displayName=de;function K(r){return r?"checked":"unchecked"}var ce=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],N="RadioGroup",[le]=S(N,[A,T]),U=A(),z=T(),[pe,ue]=le(N),H=d.forwardRef((r,a)=>{const{__scopeRadioGroup:o,name:c,defaultValue:t,value:i,required:n=!1,disabled:m=!1,orientation:l,dir:f,loop:v=!0,onValueChange:u,...R}=r,s=U(o),p=Z(f),[x,h]=Q({prop:i,defaultProp:t??null,onChange:u,caller:N});return e.jsx(pe,{scope:o,name:c,required:n,disabled:m,value:x,onValueChange:h,children:e.jsx(Y,{asChild:!0,...s,orientation:l,dir:p,loop:v,children:e.jsx(I.div,{role:"radiogroup","aria-required":n,"aria-orientation":l,"data-disabled":m?"":void 0,dir:p,...R,ref:a})})})});H.displayName=N;var $="RadioGroupItem",W=d.forwardRef((r,a)=>{const{__scopeRadioGroup:o,disabled:c,...t}=r,i=ue($,o),n=i.disabled||c,m=U(o),l=z(o),f=d.useRef(null),v=_(a,f),u=i.value===t.value,R=d.useRef(!1);return d.useEffect(()=>{const s=x=>{ce.includes(x.key)&&(R.current=!0)},p=()=>R.current=!1;return document.addEventListener("keydown",s),document.addEventListener("keyup",p),()=>{document.removeEventListener("keydown",s),document.removeEventListener("keyup",p)}},[]),e.jsx(J,{asChild:!0,...m,focusable:!n,active:u,children:e.jsx(M,{disabled:n,required:i.required,checked:u,...l,...t,name:i.name,ref:v,onCheck:()=>i.onValueChange(t.value),onKeyDown:w(s=>{s.key==="Enter"&&s.preventDefault()}),onFocus:w(t.onFocus,()=>{var s;R.current&&((s=f.current)==null||s.click())})})})});W.displayName=$;var me="RadioGroupIndicator",X=d.forwardRef((r,a)=>{const{__scopeRadioGroup:o,...c}=r,t=z(o);return e.jsx(q,{...t,...c,ref:a})});X.displayName=me;var fe=H,ve=W,Re=X;function G({className:r,ref:a,...o}){return e.jsx(fe,{ref:a,"data-slot":"radio-group",className:D("grid gap-2",r),...o})}function b({className:r,ref:a,...o}){return e.jsx(ve,{ref:a,"data-slot":"radio-group-item",className:D("aspect-square h-4 w-4 rounded-full border border-border-strong","shadow-sm transition-colors duration-[var(--transition-fast)]","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:cursor-not-allowed disabled:opacity-50","data-[state=checked]:border-primary data-[state=checked]:text-primary",r),...o,children:e.jsx(Re,{"data-slot":"radio-group-indicator",className:"flex items-center justify-center",children:e.jsx(ae,{className:"h-2.5 w-2.5 fill-current text-current"})})})}G.__docgenInfo={description:"",methods:[],displayName:"RadioGroup"};b.__docgenInfo={description:"",methods:[],displayName:"RadioGroupItem"};const Ve={title:"Components/RadioGroup",component:G,tags:["autodocs"]},j={args:{defaultValue:"option-1",disabled:!1},argTypes:{disabled:{control:"boolean"}},render:r=>e.jsxs(G,{...r,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{value:"option-1",id:"option-1"}),e.jsx(g,{htmlFor:"option-1",children:"Option One"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{value:"option-2",id:"option-2"}),e.jsx(g,{htmlFor:"option-2",children:"Option Two"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{value:"option-3",id:"option-3"}),e.jsx(g,{htmlFor:"option-3",children:"Option Three"})]})]})},y={render:()=>e.jsxs(G,{defaultValue:"option-1",disabled:!0,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{value:"option-1",id:"disabled-option-1"}),e.jsx(g,{htmlFor:"disabled-option-1",children:"Option One"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{value:"option-2",id:"disabled-option-2"}),e.jsx(g,{htmlFor:"disabled-option-2",children:"Option Two"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{value:"option-3",id:"disabled-option-3"}),e.jsx(g,{htmlFor:"disabled-option-3",children:"Option Three"})]})]})};var O,E,L;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    defaultValue: 'option-1',
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  },
  render: args => <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option Three</Label>
      </div>
    </RadioGroup>
}`,...(L=(E=j.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var P,k,F;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="disabled-option-1" />
        <Label htmlFor="disabled-option-1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="disabled-option-2" />
        <Label htmlFor="disabled-option-2">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="disabled-option-3" />
        <Label htmlFor="disabled-option-3">Option Three</Label>
      </div>
    </RadioGroup>
}`,...(F=(k=y.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};const qe=["Default","Disabled"];export{j as Default,y as Disabled,qe as __namedExportsOrder,Ve as default};
