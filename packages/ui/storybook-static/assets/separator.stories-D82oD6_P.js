import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as S}from"./index-ZH-6pyQh.js";import{P as z}from"./index-CFwX3euR.js";import{c as C}from"./cn-BLSKlp9E.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./index-ZW2Bszwo.js";import"./index-Bo-loign.js";var y="Separator",m="horizontal",O=["horizontal","vertical"],w=S.forwardRef((t,a)=>{const{decorative:l,orientation:o=m,...d}=t,c=E(o)?o:m,b=l?{role:"none"}:{"aria-orientation":c==="vertical"?c:void 0,role:"separator"};return e.jsx(z.div,{"data-orientation":c,...b,...d,ref:a})});w.displayName=y;function E(t){return O.includes(t)}var R=w;function r({className:t,orientation:a="horizontal",decorative:l=!0,ref:o,...d}){return e.jsx(R,{ref:o,"data-slot":"separator",decorative:l,orientation:a,className:C("shrink-0 bg-border",a==="horizontal"?"h-px w-full":"h-full w-px",t),...d})}r.__docgenInfo={description:"",methods:[],displayName:"Separator",props:{orientation:{defaultValue:{value:"'horizontal'",computed:!1},required:!1},decorative:{defaultValue:{value:"true",computed:!1},required:!1}}};const k={title:"Components/Separator",component:r,tags:["autodocs"]},s={args:{orientation:"horizontal",decorative:!0},argTypes:{orientation:{control:"select",options:["horizontal","vertical"]},decorative:{control:"boolean"}},render:t=>e.jsxs("div",{className:"w-full max-w-xs",children:[e.jsx("div",{className:"text-sm font-medium",children:"Content above"}),e.jsx(r,{...t,className:"my-4"}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Content below"})]})},i={render:()=>e.jsxs("div",{className:"w-full max-w-xs",children:[e.jsx("div",{className:"text-sm font-medium",children:"Content above"}),e.jsx(r,{className:"my-4"}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Content below"})]})},n={render:()=>e.jsxs("div",{className:"flex h-5 items-center gap-4 text-sm",children:[e.jsx("div",{children:"Left"}),e.jsx(r,{orientation:"vertical"}),e.jsx("div",{children:"Right"})]})};var p,v,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    decorative: true
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    decorative: {
      control: 'boolean'
    }
  },
  render: args => <div className="w-full max-w-xs">
      <div className="text-sm font-medium">Content above</div>
      <Separator {...args} className="my-4" />
      <div className="text-sm text-muted-foreground">Content below</div>
    </div>
}`,...(u=(v=s.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var x,f,h;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <div className="text-sm font-medium">Content above</div>
      <Separator className="my-4" />
      <div className="text-sm text-muted-foreground">Content below</div>
    </div>
}`,...(h=(f=i.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var N,g,j;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="flex h-5 items-center gap-4 text-sm">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
}`,...(j=(g=n.parameters)==null?void 0:g.docs)==null?void 0:j.source}}};const F=["Default","Horizontal","Vertical"];export{s as Default,i as Horizontal,n as Vertical,F as __namedExportsOrder,k as default};
