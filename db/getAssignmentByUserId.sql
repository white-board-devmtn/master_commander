select 
user_ass_id as id,
grade,
complete,
Ass.ass_name as title,
Ass.ass_description as description,
Ass.grade_possible as gradePossible,
Ass.due_date as dueDate,
Ass.ass_type as assignment_type
from user_ass
inner join Ass using (ass_id)
where user_id = $1
-- and Ass.ass_type = 'assignment';