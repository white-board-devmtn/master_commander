select ass.ass_name as name,
ass.grade_possible as outof,
user_ass.grade as grade
from user_ass
join ass using (ass_id)
where user_ass.user_id = $1
and class_id = $2
and ass.due_date < now()
order by ass.due_date
limit 5;