update user_ass
set grade = $3,
complete = true
where user_id = $1 and ass_id = $2;