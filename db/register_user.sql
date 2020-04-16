INSERT INTO users (email, password)
VALUES ($1, $2)
returning users_id, email;