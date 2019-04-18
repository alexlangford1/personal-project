-- select list_name, list_id from list
-- join vacation v on list.vacation_id = v.vacation_id 
-- join users u on v.users_id = u.id
-- where u.id = ($1) and list.vacation_id = ($2);

select 
l.list_id,
l.list_name,
array_agg(list_item_id) as list_item_id,
array_agg(li.list_item_name) as list_text,
array_agg(li.description) as description
from list l 
left join list_item li on li.list_id = l.list_id
where l.vacation_id = $1
group by l.list_id;
