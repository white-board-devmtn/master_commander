insert into users
(
  first_name,
  last_name,
  email,
  hash,
  is_teacher
)
values
(
  ${firstName},
  ${lastName},
  ${email},
  ${hash},
  false
)
returning *
