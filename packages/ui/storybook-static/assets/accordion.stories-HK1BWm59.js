import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as u,R as m}from"./index-ZH-6pyQh.js";import{a as te}from"./index-DhX5pgku.js";import{c as je}from"./index-SuQ8WfE6.js";import{u as ne}from"./index-Bo-loign.js";import{P as _,c as re}from"./index-DiBV7ufl.js";import{u as L}from"./index-rGWUK6NW.js";import{u as ye}from"./index-B2_tsCGI.js";import{P as Re}from"./index-BlNWsJ36.js";import{u as ie}from"./index-CBQcSsvu.js";import{u as _e}from"./index-BH6b-3aW.js";import{c as S}from"./cn-BLSKlp9E.js";import{C as we}from"./chevron-down-BQSJN6R8.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./createLucideIcon-Cb4HNAjX.js";var E="Collapsible",[Ne,se]=te(E),[Pe,G]=Ne(E),ce=u.forwardRef((o,r)=>{const{__scopeCollapsible:t,open:n,defaultOpen:s,disabled:i,onOpenChange:c,...l}=o,[d,p]=L({prop:n,defaultProp:s??!1,onChange:c,caller:E});return e.jsx(Pe,{scope:t,disabled:i,contentId:ie(),open:d,onOpenToggle:u.useCallback(()=>p(f=>!f),[p]),children:e.jsx(_.div,{"data-state":W(d),"data-disabled":i?"":void 0,...l,ref:r})})});ce.displayName=E;var ae="CollapsibleTrigger",le=u.forwardRef((o,r)=>{const{__scopeCollapsible:t,...n}=o,s=G(ae,t);return e.jsx(_.button,{type:"button","aria-controls":s.contentId,"aria-expanded":s.open||!1,"data-state":W(s.open),"data-disabled":s.disabled?"":void 0,disabled:s.disabled,...n,ref:r,onClick:re(o.onClick,s.onOpenToggle)})});le.displayName=ae;var K="CollapsibleContent",de=u.forwardRef((o,r)=>{const{forceMount:t,...n}=o,s=G(K,o.__scopeCollapsible);return e.jsx(Re,{present:t||s.open,children:({present:i})=>e.jsx(Te,{...n,ref:r,present:i})})});de.displayName=K;var Te=u.forwardRef((o,r)=>{const{__scopeCollapsible:t,present:n,children:s,...i}=o,c=G(K,t),[l,d]=u.useState(n),p=u.useRef(null),f=ne(r,p),h=u.useRef(0),y=h.current,A=u.useRef(0),w=A.current,x=c.open||l,v=u.useRef(x),C=u.useRef(void 0);return u.useEffect(()=>{const a=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(a)},[]),ye(()=>{const a=p.current;if(a){C.current=C.current||{transitionDuration:a.style.transitionDuration,animationName:a.style.animationName},a.style.transitionDuration="0s",a.style.animationName="none";const R=a.getBoundingClientRect();h.current=R.height,A.current=R.width,v.current||(a.style.transitionDuration=C.current.transitionDuration,a.style.animationName=C.current.animationName),d(n)}},[c.open,n]),e.jsx(_.div,{"data-state":W(c.open),"data-disabled":c.disabled?"":void 0,id:c.contentId,hidden:!x,...i,ref:f,style:{"--radix-collapsible-content-height":y?`${y}px`:void 0,"--radix-collapsible-content-width":w?`${w}px`:void 0,...o.style},children:x&&s})});function W(o){return o?"open":"closed"}var Se=ce,Ee=le,De=de,g="Accordion",Oe=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[F,Me,ke]=je(g),[D]=te(g,[ke,se]),z=se(),pe=m.forwardRef((o,r)=>{const{type:t,...n}=o,s=n,i=n;return e.jsx(F.Provider,{scope:o.__scopeAccordion,children:t==="multiple"?e.jsx(He,{...i,ref:r}):e.jsx(Ve,{...s,ref:r})})});pe.displayName=g;var[me,Ye]=D(g),[ue,$e]=D(g,{collapsible:!1}),Ve=m.forwardRef((o,r)=>{const{value:t,defaultValue:n,onValueChange:s=()=>{},collapsible:i=!1,...c}=o,[l,d]=L({prop:t,defaultProp:n??"",onChange:s,caller:g});return e.jsx(me,{scope:o.__scopeAccordion,value:m.useMemo(()=>l?[l]:[],[l]),onItemOpen:d,onItemClose:m.useCallback(()=>i&&d(""),[i,d]),children:e.jsx(ue,{scope:o.__scopeAccordion,collapsible:i,children:e.jsx(fe,{...c,ref:r})})})}),He=m.forwardRef((o,r)=>{const{value:t,defaultValue:n,onValueChange:s=()=>{},...i}=o,[c,l]=L({prop:t,defaultProp:n??[],onChange:s,caller:g}),d=m.useCallback(f=>l((h=[])=>[...h,f]),[l]),p=m.useCallback(f=>l((h=[])=>h.filter(y=>y!==f)),[l]);return e.jsx(me,{scope:o.__scopeAccordion,value:c,onItemOpen:d,onItemClose:p,children:e.jsx(ue,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(fe,{...i,ref:r})})})}),[Le,O]=D(g),fe=m.forwardRef((o,r)=>{const{__scopeAccordion:t,disabled:n,dir:s,orientation:i="vertical",...c}=o,l=m.useRef(null),d=ne(l,r),p=Me(t),h=_e(s)==="ltr",y=re(o.onKeyDown,A=>{var U;if(!Oe.includes(A.key))return;const w=A.target,x=p().filter(V=>{var q;return!((q=V.ref.current)!=null&&q.disabled)}),v=x.findIndex(V=>V.ref.current===w),C=x.length;if(v===-1)return;A.preventDefault();let a=v;const R=0,k=C-1,Y=()=>{a=v+1,a>k&&(a=R)},$=()=>{a=v-1,a<R&&(a=k)};switch(A.key){case"Home":a=R;break;case"End":a=k;break;case"ArrowRight":i==="horizontal"&&(h?Y():$());break;case"ArrowDown":i==="vertical"&&Y();break;case"ArrowLeft":i==="horizontal"&&(h?$():Y());break;case"ArrowUp":i==="vertical"&&$();break}const be=a%C;(U=x[be].ref.current)==null||U.focus()});return e.jsx(Le,{scope:t,disabled:n,direction:s,orientation:i,children:e.jsx(F.Slot,{scope:t,children:e.jsx(_.div,{...c,"data-orientation":i,ref:d,onKeyDown:n?void 0:y})})})}),T="AccordionItem",[Ge,B]=D(T),he=m.forwardRef((o,r)=>{const{__scopeAccordion:t,value:n,...s}=o,i=O(T,t),c=Ye(T,t),l=z(t),d=ie(),p=n&&c.value.includes(n)||!1,f=i.disabled||o.disabled;return e.jsx(Ge,{scope:t,open:p,disabled:f,triggerId:d,children:e.jsx(Se,{"data-orientation":i.orientation,"data-state":Ie(p),...l,...s,ref:r,disabled:f,open:p,onOpenChange:h=>{h?c.onItemOpen(n):c.onItemClose(n)}})})});he.displayName=T;var ge="AccordionHeader",Ae=m.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,s=O(g,t),i=B(ge,t);return e.jsx(_.h3,{"data-orientation":s.orientation,"data-state":Ie(i.open),"data-disabled":i.disabled?"":void 0,...n,ref:r})});Ae.displayName=ge;var H="AccordionTrigger",xe=m.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,s=O(g,t),i=B(H,t),c=$e(H,t),l=z(t);return e.jsx(F.ItemSlot,{scope:t,children:e.jsx(Ee,{"aria-disabled":i.open&&!c.collapsible||void 0,"data-orientation":s.orientation,id:i.triggerId,...l,...n,ref:r})})});xe.displayName=H;var ve="AccordionContent",Ce=m.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,s=O(g,t),i=B(ve,t),c=z(t);return e.jsx(De,{role:"region","aria-labelledby":i.triggerId,"data-orientation":s.orientation,...c,...n,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});Ce.displayName=ve;function Ie(o){return o?"open":"closed"}var Ke=pe,We=he,Fe=Ae,ze=xe,Be=Ce;function M({className:o,ref:r,...t}){return e.jsx(Ke,{ref:r,"data-slot":"accordion",className:S("w-full",o),...t})}function I({className:o,ref:r,...t}){return e.jsx(We,{ref:r,"data-slot":"accordion-item",className:S("border-b border-border",o),...t})}function b({className:o,children:r,ref:t,...n}){return e.jsx(Fe,{className:"flex",children:e.jsxs(ze,{ref:t,"data-slot":"accordion-trigger",className:S("flex flex-1 items-center justify-between py-4 text-sm font-medium","transition-all duration-[var(--transition-normal)]","hover:bg-accent hover:text-accent-foreground","[&[data-state=open]>svg]:rotate-180",o),...n,children:[r,e.jsx(we,{className:"h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"})]})})}function j({className:o,children:r,ref:t,...n}){return e.jsx(Be,{ref:t,"data-slot":"accordion-content",className:S("overflow-hidden text-sm","data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",o),...n,children:e.jsx("div",{className:"pb-4 pt-0",children:r})})}M.__docgenInfo={description:"",methods:[],displayName:"Accordion"};I.__docgenInfo={description:"",methods:[],displayName:"AccordionItem"};b.__docgenInfo={description:"",methods:[],displayName:"AccordionTrigger"};j.__docgenInfo={description:"",methods:[],displayName:"AccordionContent"};const mo={title:"Components/Accordion",component:M,tags:["autodocs"]},N={args:{type:"single",collapsible:!0,className:"w-[400px]"},argTypes:{type:{control:"select",options:["single","multiple"]},collapsible:{control:"boolean"}},render:o=>e.jsxs(M,{...o,children:[e.jsxs(I,{value:"item-1",children:[e.jsx(b,{children:"Is it accessible?"}),e.jsx(j,{children:"Yes. It adheres to the WAI-ARIA design pattern for accordions."})]}),e.jsxs(I,{value:"item-2",children:[e.jsx(b,{children:"Is it styled?"}),e.jsx(j,{children:"Yes. It comes with default styles that match the other components in the design system."})]}),e.jsxs(I,{value:"item-3",children:[e.jsx(b,{children:"Is it animated?"}),e.jsx(j,{children:"Yes. It uses CSS animations via Radix data attributes for smooth open and close transitions."})]})]})},P={render:()=>e.jsxs(M,{type:"multiple",className:"w-[400px]",children:[e.jsxs(I,{value:"item-1",children:[e.jsx(b,{children:"Is it accessible?"}),e.jsx(j,{children:"Yes. It adheres to the WAI-ARIA design pattern for accordions."})]}),e.jsxs(I,{value:"item-2",children:[e.jsx(b,{children:"Is it styled?"}),e.jsx(j,{children:"Yes. It comes with default styles that match the other components in the design system."})]}),e.jsxs(I,{value:"item-3",children:[e.jsx(b,{children:"Is it animated?"}),e.jsx(j,{children:"Yes. It uses CSS animations via Radix data attributes for smooth open and close transitions."})]})]})};var J,Q,X;N.parameters={...N.parameters,docs:{...(J=N.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-[400px]'
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple']
    },
    collapsible: {
      control: 'boolean'
    }
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern for accordions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components in the design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS animations via Radix data attributes for smooth open and close
          transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(X=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,oe;P.parameters={...P.parameters,docs:{...(Z=P.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern for accordions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components in the design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS animations via Radix data attributes for smooth open and close
          transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(oe=(ee=P.parameters)==null?void 0:ee.docs)==null?void 0:oe.source}}};const uo=["Default","Multiple"];export{N as Default,P as Multiple,uo as __namedExportsOrder,mo as default};
