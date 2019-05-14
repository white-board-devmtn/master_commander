select 
class_id as classID,
Lecture.lecture_date as lectureDate,
Lecture.lecture_title as lectureTitle,
Lecture.lecture_description as lectureDesc,
Ass.ass_name as assignmentName,
Ass.ass_description as assignmentDesc,
Ass.due_date as assignmentDate
from User_Class
inner join Class using (class_id)
inner join Lecture using (class_id)
inner join Ass using (class_id)
where class_id = $1