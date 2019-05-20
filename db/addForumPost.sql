insert into Forums(user_id, class_id, post, timestamp)
values
($1, $2, $3, $4::timestamp);