import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-ZH-6pyQh.js";import{P as x,c as w}from"./index-DiBV7ufl.js";import{a as B}from"./index-DhX5pgku.js";import{R as q,I as z,c as E}from"./index-B72zH5le.js";import{P as H}from"./index-BlNWsJ36.js";import{u as J}from"./index-BH6b-3aW.js";import{u as Q}from"./index-rGWUK6NW.js";import{u as U}from"./index-CBQcSsvu.js";import{c as h}from"./cn-BLSKlp9E.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./index-Bo-loign.js";import"./index-SuQ8WfE6.js";import"./index-BzHRfv9E.js";import"./index-B2_tsCGI.js";var y="Tabs",[W]=B(y,[E]),M=E(),[X,C]=W(y),S=m.forwardRef((t,a)=>{const{__scopeTabs:s,value:r,onValueChange:i,defaultValue:d,orientation:o="horizontal",dir:l,activationMode:f="automatic",...v}=t,c=J(l),[n,u]=Q({prop:r,onChange:i,defaultProp:d??"",caller:y});return e.jsx(X,{scope:s,baseId:U(),value:n,onValueChange:u,orientation:o,dir:c,activationMode:f,children:e.jsx(x.div,{dir:c,"data-orientation":o,...v,ref:a})})});S.displayName=y;var G="TabsList",L=m.forwardRef((t,a)=>{const{__scopeTabs:s,loop:r=!0,...i}=t,d=C(G,s),o=M(s);return e.jsx(q,{asChild:!0,...o,orientation:d.orientation,dir:d.dir,loop:r,children:e.jsx(x.div,{role:"tablist","aria-orientation":d.orientation,...i,ref:a})})});L.displayName=G;var D="TabsTrigger",F=m.forwardRef((t,a)=>{const{__scopeTabs:s,value:r,disabled:i=!1,...d}=t,o=C(D,s),l=M(s),f=O(o.baseId,r),v=K(o.baseId,r),c=r===o.value;return e.jsx(z,{asChild:!0,...l,focusable:!i,active:c,children:e.jsx(x.button,{type:"button",role:"tab","aria-selected":c,"aria-controls":v,"data-state":c?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:f,...d,ref:a,onMouseDown:w(t.onMouseDown,n=>{!i&&n.button===0&&n.ctrlKey===!1?o.onValueChange(r):n.preventDefault()}),onKeyDown:w(t.onKeyDown,n=>{[" ","Enter"].includes(n.key)&&o.onValueChange(r)}),onFocus:w(t.onFocus,()=>{const n=o.activationMode!=="manual";!c&&!i&&n&&o.onValueChange(r)})})})});F.displayName=D;var k="TabsContent",$=m.forwardRef((t,a)=>{const{__scopeTabs:s,value:r,forceMount:i,children:d,...o}=t,l=C(k,s),f=O(l.baseId,r),v=K(l.baseId,r),c=r===l.value,n=m.useRef(c);return m.useEffect(()=>{const u=requestAnimationFrame(()=>n.current=!1);return()=>cancelAnimationFrame(u)},[]),e.jsx(H,{present:i||c,children:({present:u})=>e.jsx(x.div,{"data-state":c?"active":"inactive","data-orientation":l.orientation,role:"tabpanel","aria-labelledby":f,hidden:!u,id:v,tabIndex:0,...o,ref:a,style:{...t.style,animationDuration:n.current?"0s":void 0},children:u&&d})})});$.displayName=k;function O(t,a){return`${t}-trigger-${a}`}function K(t,a){return`${t}-content-${a}`}var Y=S,Z=L,ee=F,te=$;function j({className:t,ref:a,...s}){return e.jsx(Y,{ref:a,"data-slot":"tabs",className:h("w-full",t),...s})}function N({className:t,ref:a,...s}){return e.jsx(Z,{ref:a,"data-slot":"tabs-list",className:h("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",t),...s})}function p({className:t,ref:a,...s}){return e.jsx(ee,{ref:a,"data-slot":"tabs-trigger",className:h("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1","text-sm font-medium ring-offset-background","transition-all duration-[var(--transition-fast)]","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2","disabled:pointer-events-none disabled:opacity-50","data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",t),...s})}function g({className:t,ref:a,...s}){return e.jsx(te,{ref:a,"data-slot":"tabs-content",className:h("mt-2 ring-offset-background","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...s})}j.__docgenInfo={description:"",methods:[],displayName:"Tabs"};N.__docgenInfo={description:"",methods:[],displayName:"TabsList"};p.__docgenInfo={description:"",methods:[],displayName:"TabsTrigger"};g.__docgenInfo={description:"",methods:[],displayName:"TabsContent"};const xe={title:"Components/Tabs",component:j,tags:["autodocs"]},b={args:{defaultValue:"account",className:"w-[400px]"},render:t=>e.jsxs(j,{...t,children:[e.jsxs(N,{children:[e.jsx(p,{value:"account",children:"Account"}),e.jsx(p,{value:"password",children:"Password"})]}),e.jsx(g,{value:"account",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"Make changes to your account here."})}),e.jsx(g,{value:"password",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"Change your password here."})})]})},T={render:()=>e.jsxs(j,{defaultValue:"overview",className:"w-[400px]",children:[e.jsxs(N,{children:[e.jsx(p,{value:"overview",children:"Overview"}),e.jsx(p,{value:"analytics",children:"Analytics"}),e.jsx(p,{value:"reports",children:"Reports"})]}),e.jsx(g,{value:"overview",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"Get a high-level summary of your project here."})}),e.jsx(g,{value:"analytics",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"View detailed analytics and usage metrics."})}),e.jsx(g,{value:"reports",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"Generate and download reports for your data."})})]})};var _,I,A;b.parameters={...b.parameters,docs:{...(_=b.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    defaultValue: 'account',
    className: 'w-[400px]'
  },
  render: args => <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </TabsContent>
    </Tabs>
}`,...(A=(I=b.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var R,P,V;T.parameters={...T.parameters,docs:{...(R=T.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">
          Get a high-level summary of your project here.
        </p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground">
          View detailed analytics and usage metrics.
        </p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm text-muted-foreground">
          Generate and download reports for your data.
        </p>
      </TabsContent>
    </Tabs>
}`,...(V=(P=T.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};const he=["Default","ThreeTabs"];export{b as Default,T as ThreeTabs,he as __namedExportsOrder,xe as default};
