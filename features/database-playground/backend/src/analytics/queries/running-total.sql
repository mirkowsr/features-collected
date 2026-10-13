select o.order_id ,
  sum(o.quantity * p.price) over (order by o.order_date asc) as running_total
from orders o 
  left join products p 
on p.product_id = o.product_id 
  order by order_date asc;
  

