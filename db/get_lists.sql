
select 
l.list_id,
l.list_name,
array_agg(list_item_id order by li.list_item_id) as list_item_id,
array_agg(li.list_item_name order by li.list_item_id) as list_text,
array_agg(li.budget order by li.list_item_id) as budget
from list l 
left join list_item li on li.list_id = l.list_id
where l.vacation_id = $1
group by l.list_id;
