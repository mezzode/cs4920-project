
-- Users
INSERT INTO users(username, password, email)
VALUES
    ('jfu', 'foobar', 'jfu@gmail.com'),
    ('user1', 'pass1', 'user1@gmail.com'),
    ('user2', 'pass2', 'user2@gmail.com'),
    ('user3', 'pass3', 'user3@gmail.com'),
    ('user4', 'pass4', 'user4@gmail.com');

-- Media
INSERT INTO media(api_id)
VALUES
    ('12345'),
    ('67890');

INSERT INTO list(name, user_id)
VALUES
    ('mezzode''s List', 1);

-- Entry
INSERT INTO entry(media_id, category, started, finished, list_id, last_updated)
VALUES
    (1, 'Progress', '2016', '2018', 1, now()),
    (2, 'Complete', '2017-10-01', '2017-10-01', 1, now()),
    (1, 'Progress', '2017-10-01', '2017-10-01', 1, now()),
    (2, 'Complete', '2017-10', '2017-10-01', 1, now());
