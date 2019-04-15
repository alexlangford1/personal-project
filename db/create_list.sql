insert into list
(list_name)
values $1
returning list_name;