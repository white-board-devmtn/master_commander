select 
user_ass_id as id,
grade,
complete,
Ass.ass_name as title,
Ass.ass_description as description,
Ass.grade_possible as gradePossible,
Ass.due_date as dueDate
from user_ass
inner join Ass using (ass_id)
where user_id = $1
and Ass.ass_type = 'test';