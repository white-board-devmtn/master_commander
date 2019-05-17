select user_id from user_class
join class using (class_id)
where class_id = 2;