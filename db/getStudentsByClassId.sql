select
users.first_name as firstName,
users.last_name as lastName,
users.user_id as id,
user_class.class_id,
ARRAY_AGG(user_ass.ass_link) as link,
ARRAY_AGG(Ass.ass_name) as assignmentName,
ARRAY_AGG(Ass.grade_possible) as outof,
ARRAY_AGG(ass.due_date) as duedate,
ARRAY_AGG(user_ass.grade) as points,
ARRAY_AGG(user_ass.complete) as submitted
from users
join user_class using (user_id)
join user_ass using (user_id)
join ass using (ass_id)
where user_class.class_id = $1
AND ass.class_id = $1
group by users.first_name, users.last_name, users.user_id, user_class.class_id;