select
users.first_name as firstName,
users.last_name as lastName,
ARRAY_AGG(Ass.ass_name) as assignmentName,
ARRAY_AGG(Ass.grade_possible) as outof,
ARRAY_AGG(user_ass.grade) as points,
ARRAY_AGG(user_ass.complete)
from user_ass 
join users on users.user_id = user_ass.user_id
join ass on ass.ass_id = user_ass.ass_id
where Ass.class_id = $1
group by users.first_name, users.last_name