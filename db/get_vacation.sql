select v.vacation_name, v.vacation_id from vacation v
join users u on v.users_id = u.id
where u.id = $1;