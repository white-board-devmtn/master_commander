select 
class_id as classID,
user_class_id as userClassID,
Class.start_date as startDate,
Class.end_date as endDate,
Course.course_name as name,
Course.course_description as desc,
users.first_name as firstName,
users.last_name as lastName
from user_class
join class using (class_id)
join course using (course_id)
join users using (user_id)
where user_id = $1;