select * from user_class
inner join Class using (class_id)
inner join Lecture using (class_id)
inner join Ass using (class_id)
inner join Messages using (class_id)
where class_id = $1;