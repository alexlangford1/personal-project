select  
l.list_id, 
li.list_item_name as list_text,
li.list_item_id,
li.description 

from list l, list_item
join list_item li on li.list_id = l.list_id 
where l.vacation_id = $2 
li.list_id = $3; 