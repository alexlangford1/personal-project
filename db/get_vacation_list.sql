select * from list l
join vacation v on l.vacation_id = v.vacation_id
join users u on v.users_id = u.id;