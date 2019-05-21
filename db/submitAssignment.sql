update user_ass
set ass_link = $3,
complete = $4
where user_id = $1 and ass_id = $2