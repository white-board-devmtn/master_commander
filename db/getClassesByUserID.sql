select 
class_id as classID,
user_class_id as userClassID,
Class.start_date as startDate,
Class.end_date as endDate,
Course.course_name as name,
Course.course_description as desc
from user_class
inner join class using (class_id)
inner join course using (course_id)
where user_id = $1;