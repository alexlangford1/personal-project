insert into list_item
(list_item_name, description)
values $1, $2
returning list_item_name, description;