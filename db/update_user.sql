update users
set first_name = $2,
last_name = $3,
phone_number = $4,
img = $5
where user_id = $1
returning *;