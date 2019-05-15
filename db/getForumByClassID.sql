select
message_id as id,
post,
timestamp as date,
users.first_name as firstname,
users.last_name as lastname
from Forums
inner join users using (user_id)
where class_id = $1
order by timestamp;