select sum(budget) from list_item li
join list l on li.list_id = l.list_id
join vacation v on l.vacation_id = v.vacation_id
where v.vacation_id = $1;