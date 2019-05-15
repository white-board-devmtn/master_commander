select
Ass.ass_name as name,
ass.due_date as duedate
from user_ass 
join users on users.user_id = user_ass.user_id
join ass on ass.ass_id = user_ass.ass_id
/* need to make sure date getting passed in is correct format YYYY-MM-DD */
where users.user_id = $1 and ass.class_id = $2 and ass.due_date > $3::date
limit 5