
-- Users
INSERT INTO users(username, password)
VALUES
    ('jfu', 'foobar'),
    ('user1', 'pass1'),
    ('user2', 'pass2'),
    ('user3', 'pass3'),
    ('user4', 'pass4');

-- Media
INSERT INTO media(api_id)
VALUES
    ('12345'),
    ('67890');

INSERT INTO list(id, name)
VALUES
    (1, 'mezzode''s List');

-- Entry
INSERT INTO entry(media_id, user_id, category, started, finished, list_id, last_updated)
VALUES
    (1, 1, 'Progress', '2016', '2018', 1, now()),
    (2, 1, 'Complete', '2017-10-01', '2017-10-01', 1, now()),
    (1, 2, 'Progress', '2017-10-01', '2017-10-01', 1, now()),
    (2, 3, 'Complete', '2017-10', '2017-10-01', 1, now());
