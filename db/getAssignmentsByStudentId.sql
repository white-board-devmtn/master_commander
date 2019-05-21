select
Ass.ass_name as name,
Ass.ass_description as description,
user_ass.grade as points,
Ass.grade_possible as outof,
user_ass.complete,
user_ass.ass_id,
ass.class_id,
ass.due_date 
from user_ass 
join users on users.user_id = user_ass.user_id
join ass on ass.ass_id = user_ass.ass_id
where users.user_id = $1 and ass.class_id = $2
order by due_date;