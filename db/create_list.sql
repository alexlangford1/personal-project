insert into list
(list_name, vacation_id)
values ($1, $2)
returning list_name list_id;