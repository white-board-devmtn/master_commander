select 
announcement_id as id,
announcement_info as info,
timestamp as date
from Announcements
where class_id = $1

order by timestamp desc;