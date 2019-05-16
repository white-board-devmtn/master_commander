select * from Events
where user_id = $1
order by start_date