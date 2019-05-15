select
ass_name,
ass_description,
grade_possible,
due_date
from ass
where class_id = $1