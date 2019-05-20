update users
set first_name = $2,
last_name = $3,
email = $4,
phone_number = $5,
img = $6
where user_id = $1
returning *;