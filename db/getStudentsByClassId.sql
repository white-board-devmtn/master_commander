select
users.first_name as firstName,
users.last_name as lastName,
Ass.ass_name as assignmentName,
Ass.grade_possible as outof,
user_ass.grade as points,
user_ass.complete
from user_ass 
join users on users.user_id = user_ass.user_id
join ass on ass.ass_id = user_ass.ass_id
where Ass.ass_id = $1;