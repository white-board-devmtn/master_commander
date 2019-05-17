select 
course.course_name as name,
ARRAY_AGG(ass.grade_possible) as pointsPossible,
ARRAY_AGG(user_ass.grade) as pointsRecieved
from user_ass
join ass using (ass_id)
join class using (class_id)
join course using (course_id)
where user_id = $1 
AND user_ass.grade is not null
group by course.course_name;