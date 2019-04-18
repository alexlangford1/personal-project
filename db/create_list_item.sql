insert into list_item
(list_id, list_item_name)
values ($1, $2)
returning list_item_name;