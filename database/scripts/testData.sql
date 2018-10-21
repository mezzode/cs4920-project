
-- Users
-- Default test user: { username: jfu, password: foobar }
INSERT INTO users(username, password, email)
VALUES
    ('jfu', '$2a$10$xYR4Kdp9/eCHpW8p15Jov.u7RHXVLKxQER4VrPirtYkPTR2aOh6rq', 'jfu@gmail.com'),
    ('user1', '$2a$10$xYR4Kdp9/eCHpW8p15Jov.u7RHXVLKxQER4VrPirtYkPTR2aOh6rq', 'user1@gmail.com'),
    ('user2', '$2a$10$xYR4Kdp9/eCHpW8p15Jov.u7RHXVLKxQER4VrPirtYkPTR2aOh6rq', 'user2@gmail.com'),
    ('user3', '$2a$10$xYR4Kdp9/eCHpW8p15Jov.u7RHXVLKxQER4VrPirtYkPTR2aOh6rq', 'user3@gmail.com'),
    ('user4', '$2a$10$xYR4Kdp9/eCHpW8p15Jov.u7RHXVLKxQER4VrPirtYkPTR2aOh6rq', 'user4@gmail.com');

INSERT INTO list(name, user_id, media_type)
VALUES
    ('mezzode''s List', 1, 'game');

-- Entry
INSERT INTO entry(media_id, category, started, finished, list_id, last_updated, tags)
VALUES
    (12579, 'Progress', '2016', '2018', 1, now(), '{"Favourites", "Friends"}'),
    (9694, 'Complete', '2017-10-01', '2017-10-01', 1, now(), '{"Favourites"}'),
    (12579, 'Progress', '2017-10-01', '2017-10-01', 1, now(), '{}'),
    (9694, 'Complete', '2017-10', '2017-10-01', 1, now(), '{}');
