select
users.first_name as firstName,
users.last_name as lastName,
user_ass.complete as submitted,
user_ass.grade,
ass.grade_possible as outOf,
ass.ass_name as assignmentName,
ass.due_date as dueDate
from users
join user_ass on users.user_id = user_ass.user_id
join ass on user_ass.ass_id = ass.ass_id
where ass.ass_id = $1 and ass.class_id = $2
