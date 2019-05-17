select 
ass.grade_possible as outOf,
user_ass.grade as grade,
user_ass_id as id,
users.first_name as firstName,
users.last_Name as lastName,
user_ass.complete
from user_ass
join ass using (ass_id)
join users using (user_id)
where ass_id = $1 AND 
class_id = $2;