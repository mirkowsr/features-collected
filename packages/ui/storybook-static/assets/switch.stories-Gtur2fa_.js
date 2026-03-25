import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{L as Z}from"./label-ybmONEYr.js";import{r as s}from"./index-ZH-6pyQh.js";import{P as z,c as ee}from"./index-DiBV7ufl.js";import{u as X}from"./index-Bo-loign.js";import{a as te}from"./index-DhX5pgku.js";import{u as re}from"./index-rGWUK6NW.js";import{u as ae}from"./index-CYU-ZmrK.js";import{u as oe}from"./index-DFrgnYfK.js";import{c as E}from"./cn-BLSKlp9E.js";import"./index-CFwX3euR.js";import"./index-BP-xEy0R.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DVyBTwwr.js";import"./index-ZW2Bszwo.js";import"./index-B2_tsCGI.js";var w="Switch",[se]=te(w),[ne,ce]=se(w),$=s.forwardRef((r,a)=>{const{__scopeSwitch:e,name:n,checked:o,defaultChecked:S,required:d,disabled:c,value:l="on",onCheckedChange:C,form:i,...x}=r,[u,p]=s.useState(null),y=X(a,f=>p(f)),P=s.useRef(!1),j=u?i||!!u.closest("form"):!0,[m,V]=re({prop:o,defaultProp:S??!1,onChange:C,caller:w});return t.jsxs(ne,{scope:e,checked:m,disabled:c,children:[t.jsx(z.button,{type:"button",role:"switch","aria-checked":m,"aria-required":d,"data-state":Q(m),"data-disabled":c?"":void 0,disabled:c,value:l,...x,ref:y,onClick:ee(r.onClick,f=>{V(Y=>!Y),j&&(P.current=f.isPropagationStopped(),P.current||f.stopPropagation())})}),j&&t.jsx(K,{control:u,bubbles:!P.current,name:n,value:l,checked:m,required:d,disabled:c,form:i,style:{transform:"translateX(-100%)"}})]})});$.displayName=w;var G="SwitchThumb",J=s.forwardRef((r,a)=>{const{__scopeSwitch:e,...n}=r,o=ce(G,e);return t.jsx(z.span,{"data-state":Q(o.checked),"data-disabled":o.disabled?"":void 0,...n,ref:a})});J.displayName=G;var ie="SwitchBubbleInput",K=s.forwardRef(({__scopeSwitch:r,control:a,checked:e,bubbles:n=!0,...o},S)=>{const d=s.useRef(null),c=X(d,S),l=ae(e),C=oe(a);return s.useEffect(()=>{const i=d.current;if(!i)return;const x=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(x,"checked").set;if(l!==e&&p){const y=new Event("click",{bubbles:n});p.call(i,e),i.dispatchEvent(y)}},[l,e,n]),t.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:e,...o,tabIndex:-1,ref:c,style:{...o.style,...C,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});K.displayName=ie;function Q(r){return r?"checked":"unchecked"}var de=$,le=J;function _({className:r,ref:a,...e}){return t.jsx(de,{ref:a,"data-slot":"switch",className:E("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full","border-2 border-transparent shadow-sm","transition-colors duration-[var(--transition-fast)]","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:cursor-not-allowed disabled:opacity-50","data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",r),...e,children:t.jsx(le,{"data-slot":"switch-thumb",className:E("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0","transition-transform duration-[var(--transition-fast)]","data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0")})})}_.__docgenInfo={description:"",methods:[],displayName:"Switch"};const je={title:"Components/Switch",component:_,tags:["autodocs"]},h={args:{disabled:!1},argTypes:{disabled:{control:"boolean"},defaultChecked:{control:"boolean"}}},b={render:()=>t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx(Z,{htmlFor:"airplane-mode",children:"Airplane Mode"}),t.jsx(_,{id:"airplane-mode"})]})},g={args:{defaultChecked:!0}},k={args:{disabled:!0}},v={args:{disabled:!0,defaultChecked:!0}};var N,R,T;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    defaultChecked: {
      control: 'boolean'
    }
  }
}`,...(T=(R=h.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var L,B,D;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
      <Switch id="airplane-mode" />
    </div>
}`,...(D=(B=b.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var I,M,A;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...(A=(M=g.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var H,F,O;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(O=(F=k.parameters)==null?void 0:F.docs)==null?void 0:O.source}}};var U,W,q;v.parameters={...v.parameters,docs:{...(U=v.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultChecked: true
  }
}`,...(q=(W=v.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};const Ee=["Default","WithLabel","Checked","Disabled","DisabledChecked"];export{g as Checked,h as Default,k as Disabled,v as DisabledChecked,b as WithLabel,Ee as __namedExportsOrder,je as default};
