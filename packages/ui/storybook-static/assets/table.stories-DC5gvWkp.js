import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as d}from"./cn-BLSKlp9E.js";function i({className:a,ref:l,...t}){return e.jsx("div",{"data-slot":"table-container",className:"relative w-full overflow-auto",children:e.jsx("table",{ref:l,"data-slot":"table",className:d("w-full caption-bottom text-sm",a),...t})})}function b({className:a,ref:l,...t}){return e.jsx("thead",{ref:l,"data-slot":"table-header",className:d("[&_tr]:border-b",a),...t})}function T({className:a,ref:l,...t}){return e.jsx("tbody",{ref:l,"data-slot":"table-body",className:d("[&_tr:last-child]:border-0",a),...t})}function H({className:a,ref:l,...t}){return e.jsx("tfoot",{ref:l,"data-slot":"table-footer",className:d("border-t bg-muted/50 font-medium [&>tr:last-child]:border-b-0",a),...t})}function o({className:a,ref:l,...t}){return e.jsx("tr",{ref:l,"data-slot":"table-row",className:d("border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",a),...t})}function n({className:a,ref:l,...t}){return e.jsx("th",{ref:l,"data-slot":"table-head",className:d("h-10 px-2 text-left align-middle font-medium text-muted-foreground","[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...t})}function s({className:a,ref:l,...t}){return e.jsx("td",{ref:l,"data-slot":"table-cell",className:d("p-2 align-middle","[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...t})}function y({className:a,ref:l,...t}){return e.jsx("caption",{ref:l,"data-slot":"table-caption",className:d("mt-4 text-sm text-muted-foreground",a),...t})}i.__docgenInfo={description:"",methods:[],displayName:"Table"};b.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};T.__docgenInfo={description:"",methods:[],displayName:"TableBody"};H.__docgenInfo={description:"",methods:[],displayName:"TableFooter"};o.__docgenInfo={description:"",methods:[],displayName:"TableRow"};n.__docgenInfo={description:"",methods:[],displayName:"TableHead"};s.__docgenInfo={description:"",methods:[],displayName:"TableCell"};y.__docgenInfo={description:"",methods:[],displayName:"TableCaption"};const _={title:"Components/Table",component:i,tags:["autodocs"]},h=[{invoice:"INV001",status:"Paid",method:"Credit Card",amount:"$250.00"},{invoice:"INV002",status:"Pending",method:"PayPal",amount:"$150.00"},{invoice:"INV003",status:"Unpaid",method:"Bank Transfer",amount:"$350.00"},{invoice:"INV004",status:"Paid",method:"Credit Card",amount:"$450.00"},{invoice:"INV005",status:"Paid",method:"PayPal",amount:"$550.00"},{invoice:"INV006",status:"Pending",method:"Bank Transfer",amount:"$200.00"},{invoice:"INV007",status:"Unpaid",method:"Credit Card",amount:"$300.00"}],r={render:a=>e.jsxs(i,{...a,children:[e.jsx(y,{children:"A list of your recent invoices."}),e.jsx(b,{children:e.jsxs(o,{children:[e.jsx(n,{className:"w-[100px]",children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Method"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsx(T,{children:h.map(l=>e.jsxs(o,{children:[e.jsx(s,{className:"font-medium",children:l.invoice}),e.jsx(s,{children:l.status}),e.jsx(s,{children:l.method}),e.jsx(s,{className:"text-right",children:l.amount})]},l.invoice))}),e.jsx(H,{children:e.jsxs(o,{children:[e.jsx(s,{colSpan:3,children:"Total"}),e.jsx(s,{className:"text-right",children:"$2,250.00"})]})})]})},c={render:()=>e.jsxs(i,{children:[e.jsx(b,{children:e.jsxs(o,{children:[e.jsx(n,{className:"w-[100px]",children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Method"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsx(T,{children:h.map(a=>e.jsxs(o,{className:"even:bg-muted/50",children:[e.jsx(s,{className:"font-medium",children:a.invoice}),e.jsx(s,{children:a.status}),e.jsx(s,{children:a.method}),e.jsx(s,{className:"text-right",children:a.amount})]},a.invoice))})]})},m={render:()=>e.jsxs(i,{children:[e.jsx(b,{children:e.jsxs(o,{children:[e.jsx(n,{className:"w-[100px]",children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Method"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsx(T,{children:h.map((a,l)=>e.jsxs(o,{"data-state":l===1||l===3?"selected":void 0,children:[e.jsx(s,{className:"font-medium",children:a.invoice}),e.jsx(s,{children:a.status}),e.jsx(s,{children:a.method}),e.jsx(s,{className:"text-right",children:a.amount})]},a.invoice))})]})};var u,x,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,250.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
}`,...(p=(x=r.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};var j,N,v;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice} className="even:bg-muted/50">
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...(v=(N=c.parameters)==null?void 0:N.docs)==null?void 0:v.source}}};var f,C,g;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => <TableRow key={invoice.invoice} data-state={index === 1 || index === 3 ? 'selected' : undefined}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...(g=(C=m.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};const R=["Default","Striped","WithSelection"];export{r as Default,c as Striped,m as WithSelection,R as __namedExportsOrder,_ as default};
